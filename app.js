/* ==========================================================================
   Fortune Budget Tracking – Application Logic
   All state is persisted in localStorage.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "fortune-budget-data-v1";
  var WARN_THRESHOLD = 0.8;     // warn at 80% of a limit
  var OVERSPEND_TOLERANCE = 1;  // not more than $1 over today's limit before warning

  var state = loadState();

  /* ---------- Data helpers ---------- */

  function defaultState() {
    var today = toDateString(new Date());
    var budget = 0;
    var categories = ["Business Expenses", "Supplies", "Utilities"];
    var expenses = [
      {
        id: uid(),
        amount: 80,
        category: "Business Expenses",
        date: today,
        note: "First business expense"
      }
    ];
    var template = {
      budget: budget,
      categories: categories,
      expenses: expenses
    };
    saveState(template);
    return template;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.expenses)) {
        return defaultState();
      }
      parsed.expenses = parsed.expenses.map(function (e) {
        e.amount = Number(e.amount) || 0;
        return e;
      });
      return parsed;
    } catch (err) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      showToast("Could not save data to your browser.");
    }
  }

  function uid() {
    return "e_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function toDateString(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayString() {
    return toDateString(new Date());
  }

  function monthString() {
    return todayString().slice(0, 7);
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function formatDate(iso) {
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    return pad2(parts[1]) + "/" + pad2(parts[2]) + "/" + parts[0];
  }

  function formatMoney(n) {
    return "$" + n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatMoneyShort(n) {
    return "$" + n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  function monthName() {
    return new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
  }

  function parseISO(iso) {
    var parts = iso.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function isValidISODate(str) {
    return typeof str === "string" && /^\d{4}-\d{2}-\d{2}$/.test(str);
  }

  /* ---------- Derived calculations ---------- */

  function getExpensesInMonth() {
    var prefix = monthString();
    return state.expenses.filter(function (e) {
      return isValidISODate(e.date) && e.date.indexOf(prefix) === 0;
    });
  }

  function getExpensesToday() {
    var t = todayString();
    return state.expenses.filter(function (e) {
      return isValidISODate(e.date) && e.date === t;
    });
  }

  function getSpentToDate() {
    var today = todayString();
    return state.expenses
      .filter(function (e) { return isValidISODate(e.date) && e.date <= today; })
      .reduce(function (sum, e) { return sum + e.amount; }, 0);
  }

  /* Equitable schedule: remaining budget divided by remaining days this month,
     including today. Falls back to the whole month when no days remain. */
  function getTodayLimit() {
    var budget = Number(state.budget) || 0;
    if (budget <= 0) return 0;
    var now = new Date();
    var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    var daysRemaining = lastDay - now.getDate() + 1;
    var remaining = Math.max(budget - getSpentToDate(), 0);
    return Math.max(remaining / daysRemaining, 0);
  }

  function dailyLimitForFullMonth() {
    var budget = Number(state.budget) || 0;
    if (budget <= 0) return 0;
    var now = new Date();
    var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return budget / lastDay;
  }

  /* ---------- Rendering ---------- */

  var els = {};

  function $(sel) {
    return document.querySelector(sel);
  }

  function collectElements() {
    els = {
      budget: $("#display-budget"),
      totalSpent: $("#display-total-spent"),
      totalFoot: $("#display-total-foot"),
      remaining: $("#display-remaining"),
      remainingPct: $("#display-remaining-pct"),
      todaySpent: $("#display-today-spent"),
      todayWarning: $("#display-today-warning"),
      todayLimit: $("#display-today-limit"),
      todayRatio: $("#display-today-ratio"),
      monthLabel: $("#month-label"),
      monthBar: $("#month-progress-bar"),
      monthText: $("#month-progress-text"),
      monthDays: $("#month-progress-days"),
      dailySummary: $("#daily-plan-summary"),
      todayBar: $("#today-progress-bar"),
      todayText: $("#today-progress-text"),
      todayDate: $("#today-progress-date"),
      todayHint: $("#today-hint"),
      alertStack: $("#alert-stack"),
      catSelect: $("#expense-category"),
      catList: $("#category-list"),
      expList: $("#expense-list"),
      expEmpty: $("#expense-empty"),
      expTotalHint: $("#expense-total-hint")
    };
  }

  function render() {
    renderSummary();
    renderProgress();
    renderCategories();
    renderExpenses();
    renderAlerts();
  }

  function renderSummary() {
    var budget = Number(state.budget) || 0;
    var total = getSpentToDate();
    var remaining = Math.max(budget - total, 0);
    var todaySpent = getExpensesToday().reduce(function (s, e) { return s + e.amount; }, 0);
    var todayLimit = getTodayLimit();

    els.monthLabel.textContent = monthName();

    if (budget > 0) {
      els.budget.textContent = formatMoney(budget);
      els.totalSpent.textContent = formatMoney(total);
      els.totalFoot.textContent = percentOf(total, budget) + " of budget used";
    } else {
      els.budget.textContent = "Set a budget";
      els.totalSpent.textContent = formatMoney(total);
      els.totalFoot.textContent = "No budget set yet";
    }

    els.remaining.textContent = formatMoney(remaining);
    els.remainingPct.textContent = budget > 0
      ? percentOf(budget - total, budget) + " remaining"
      : "Set a budget to compare";

    els.todaySpent.textContent = formatMoney(todaySpent);
    els.todayWarning.textContent = todayLimit > 0
      ? "of your " + formatMoneyShort(todayLimit) + " limit"
      : "No limit set yet";
    els.todayWarning.className = "card-foot " + toneForToday(todaySpent, todayLimit);

    els.todayLimit.textContent = todayLimit > 0 ? formatMoney(todayLimit) : "\u2014";
    els.todayLimit.className = todayLimit > 0 ? "card-value" : "card-value muted";
    els.todayRatio.textContent = todayLimit > 0
      ? "For the next " + daysRemaining() + " day" + (daysRemaining() === 1 ? "" : "s")
      : "Set a budget to plan your day";
  }

  function percentOf(part, whole) {
    if (whole <= 0) return "0%";
    var pct = Math.round((part / whole) * 100);
    return Math.min(pct, 999) + "%";
  }

  function daysRemaining() {
    var now = new Date();
    var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return lastDay - now.getDate() + 1;
  }

  function toneForToday(spent, limit) {
    if (limit <= 0) return "";
    var ratio = spent / limit;
    if (ratio > 1) return "danger";
    if (ratio >= WARN_THRESHOLD) return "warn";
    return "ok";
  }

  function renderProgress() {
    var budget = Number(state.budget) || 0;
    var total = getSpentToDate();
    var todaySpent = getExpensesToday().reduce(function (s, e) { return s + e.amount; }, 0);
    var todayLimit = getTodayLimit();
    var daysLeft = daysRemaining();

    var usedPct = budget > 0 ? ((total / budget) * 100) : 0;
    usedPct = Math.min(usedPct, 100);
    els.monthBar.style.width = usedPct + "%";
    els.monthBar.className = "progress-bar " + barTone(total / Math.max(budget, 1));

    els.monthText.textContent = budget > 0
      ? percentOf(total, budget) + " of budget used"
      : "Set a monthly budget to track progress";

    els.monthDays.textContent = daysLeft + " day" + (daysLeft === 1 ? "" : "s") + " left this month";

    if (budget > 0) {
      var remaining = Math.max(budget - total, 0);
      els.dailySummary.textContent = "To stay on plan, keep spending to about " +
        formatMoneyShort(getTodayLimit()) + " per day for the rest of the month " +
        "(remaining: " + formatMoneyShort(remaining) + " over " + daysLeft + " day" + (daysLeft === 1 ? "" : "s") + ").";
    } else {
      els.dailySummary.textContent = "Set your monthly budget above to get a daily spending plan.";
    }

    var todayPct = todayLimit > 0 ? ((todaySpent / todayLimit) * 100) : 0;
    todayPct = Math.min(todayPct, 100);
    els.todayBar.style.width = todayPct + "%";
    els.todayBar.className = "progress-bar " + barTone(todayLimit > 0 ? todaySpent / todayLimit : 0);

    els.todayText.textContent = todayLimit > 0
      ? percentOf(todaySpent, todayLimit) + " of today's limit used"
      : "No daily plan yet";
    els.todayDate.textContent = formatDate(todayString());

    if (todayLimit > 0) {
      if (todaySpent > todayLimit) {
        els.todayHint.textContent = "Over today's limit by " + formatMoneyShort(todaySpent - todayLimit) + ".";
      } else {
        els.todayHint.textContent = "You can spend up to " + formatMoneyShort(todayLimit - todaySpent) + " more today.";
      }
    } else {
      els.todayHint.textContent = "Set your monthly budget to unlock today's spending plan.";
    }
  }

  function barTone(ratio) {
    if (ratio > 1) return "progress-bar-danger";
    if (ratio >= WARN_THRESHOLD) return "progress-bar-warning";
    return "progress-bar-success";
  }

  function renderCategories() {
    els.catSelect.innerHTML = '<option value="">Select category&hellip;</option>';
    els.catList.innerHTML = "";

    state.categories.forEach(function (cat) {
      var opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      els.catSelect.appendChild(opt);

      var li = document.createElement("li");
      li.className = "category-item";

      var spent = state.expenses
        .filter(function (e) { return e.category === cat; })
        .reduce(function (s, e) { return s + e.amount; }, 0);

      var name = document.createElement("span");
      name.textContent = cat;

      var spentEl = document.createElement("span");
      spentEl.className = "cat-spent";
      spentEl.textContent = formatMoneyShort(spent) + " spent";

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-remove";
      btn.setAttribute("aria-label", "Remove category " + cat);
      btn.textContent = "\u2715";
      btn.addEventListener("click", function () {
        removeCategory(cat);
      });

      li.appendChild(name);
      li.appendChild(spentEl);
      li.appendChild(btn);
      els.catList.appendChild(li);
    });
  }

  function renderExpenses() {
    els.expList.innerHTML = "";
    var sorted = state.expenses.slice().sort(function (a, b) {
      return a.date === b.date ? b.id.localeCompare(a.id) : (a.date < b.date ? 1 : -1);
    }).slice(0, 50);

    var monthTotal = getExpensesInMonth().reduce(function (s, e) { return s + e.amount; }, 0);
    els.expTotalHint.textContent = sorted.length === 0
      ? "No expenses"
      : "Showing " + sorted.length + " of " + state.expenses.length + " \u00b7 " + formatMoney(monthTotal) + " this month";

    sorted.forEach(function (exp) {
      var li = document.createElement("li");
      li.className = "expense-item";

      var cat = document.createElement("span");
      cat.className = "exp-cat";
      cat.textContent = exp.category || "Uncategorized";

      var detail = document.createElement("div");
      detail.className = "exp-detail";

      var note = document.createElement("div");
      note.className = "exp-note";
      note.textContent = exp.note || "Expense";

      var date = document.createElement("div");
      date.className = "exp-date";
      date.textContent = formatDate(exp.date);

      detail.appendChild(note);
      detail.appendChild(date);

      var amount = document.createElement("span");
      amount.className = "exp-amount";
      amount.textContent = formatMoney(exp.amount);

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-remove";
      btn.setAttribute("aria-label", "Delete expense of " + formatMoney(exp.amount));
      btn.textContent = "\u2715";
      btn.addEventListener("click", function () {
        removeExpense(exp.id);
      });

      li.appendChild(cat);
      li.appendChild(detail);
      li.appendChild(amount);
      li.appendChild(btn);
      els.expList.appendChild(li);
    });

    els.expEmpty.style.display = sorted.length === 0 ? "block" : "none";
  }

  /* ---------- Alerts ---------- */

  function renderAlerts() {
    els.alertStack.innerHTML = "";
    var budget = Number(state.budget) || 0;
    if (budget <= 0) return;

    var total = getSpentToDate();
    var todaySpent = getExpensesToday().reduce(function (s, e) { return s + e.amount; }, 0);
    var todayLimit = getTodayLimit();
    var ideal = dailyLimitForFullMonth();
    var alerts = [];

    if (total > budget) {
      alerts.push({
        tone: "danger",
        icon: "\u26a0",
        text: "You are " + formatMoneyShort(total - budget) + " over your monthly budget of " +
              formatMoneyShort(budget) + "."
      });
    } else if (total >= budget * WARN_THRESHOLD) {
      alerts.push({
        tone: "warning",
        icon: "\u26a0",
        text: "You have used " + percentOf(total, budget) + " of your monthly budget. " +
              formatMoneyShort(budget - total) + " remaining. Keep an eye on spending."
      });
    }

    if (todayLimit > 0 && todaySpent > todayLimit + OVERSPEND_TOLERANCE) {
      var overBy = todaySpent - todayLimit;
      alerts.push({
        tone: "danger",
        icon: "\u26a0",
        text: "Today's spending (" + formatMoneyShort(todaySpent) + ") is over your daily plan of " +
              formatMoneyShort(todayLimit) + " by " + formatMoneyShort(overBy) + "."
      });
    } else if (todayLimit > 0 && todaySpent >= ideal * WARN_THRESHOLD && todaySpent <= todayLimit) {
      alerts.push({
        tone: "warning",
        icon: "\u2139",
        text: "Nearing today's spending limit \u2014 you have used " +
              percentOf(todaySpent, todayLimit) + " of today's plan."
      });
    }

    if (state.expenses.length === 0) {
      alerts.push({
        tone: "warning",
        icon: "\u2139",
        text: "No expenses recorded yet. Record an expense to start tracking."
      });
    }

    alerts.forEach(function (alert) {
      var div = document.createElement("div");
      div.className = "alert alert-" + alert.tone;

      var icon = document.createElement("span");
      icon.className = "alert-icon";
      icon.textContent = alert.icon;

      var msg = document.createElement("span");
      msg.textContent = alert.text;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "alert-dismiss";
      btn.setAttribute("aria-label", "Dismiss alert");
      btn.textContent = "\u2715";
      btn.addEventListener("click", function () {
        div.remove();
      });

      div.appendChild(icon);
      div.appendChild(msg);
      div.appendChild(btn);
      els.alertStack.appendChild(div);
    });
  }

  var toastTimer = null;
  function showToast(msg) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  /* ---------- Actions ---------- */

  function setBudget(amount) {
    var value = Number(amount);
    if (!isFinite(value) || value <= 0) {
      showToast("Please enter a valid monthly budget.");
      return false;
    }
    state.budget = value;
    saveState();
    render();
    showToast("Monthly budget of " + formatMoney(value) + " saved.");
    return true;
  }

  function addCategory(name) {
    var clean = name.trim().replace(/\s+/g, " ");
    if (!clean) return false;
    var existing = state.categories.find(function (c) {
      return c.toLowerCase() === clean.toLowerCase();
    });
    if (existing) {
      showToast("That category already exists.");
      return false;
    }
    state.categories.push(clean);
    saveState();
    render();
    showToast("Category \u201c" + clean + "\u201d added.");
    return true;
  }

  function removeCategory(name) {
    var uses = state.expenses.filter(function (e) { return e.category === name; }).length;
    var message = uses > 0
      ? "Remove category \u201c" + name + "\u201d? " + uses + " expense(s) will become \u201cUncategorized\u201d."
      : "Remove category \u201c" + name + "\u201d?";
    if (!window.confirm(message)) return;
    state.categories = state.categories.filter(function (c) { return c !== name; });
    state.expenses.forEach(function (e) {
      if (e.category === name) e.category = "Uncategorized";
    });
    if (state.categories.indexOf("Uncategorized") === -1) state.categories.push("Uncategorized");
    saveState();
    render();
    showToast("Category removed.");
  }

  function addExpense(amount, category, date, note) {
    var value = Number(amount);
    if (!isFinite(value) || value <= 0) {
      showToast("Enter an amount greater than 0.");
      return false;
    }
    if (!category) {
      showToast("Choose a category.");
      return false;
    }
    if (!isValidISODate(date) && !date) {
      showToast("Choose a valid date.");
      return false;
    }
    state.expenses.push({
      id: uid(),
      amount: Math.round(value * 100) / 100,
      category: category,
      date: date,
      note: note ? note.trim().slice(0, 120) : ""
    });
    saveState();
    render();
    showToast("Expense of " + formatMoney(value) + " recorded.");
    return true;
  }

  function removeExpense(id) {
    state.expenses = state.expenses.filter(function (e) { return e.id !== id; });
    saveState();
    render();
    showToast("Expense deleted.");
  }

  function resetAll() {
    state = defaultState();
    render();
    showToast("All data has been reset.");
  }

  /* ---------- Events ---------- */

  function bindEvents() {
    $(".page-title #btn-clear-all").addEventListener("click", function () {
      $("#confirm-modal").hidden = false;
    });

    $("#modal-cancel").addEventListener("click", function () {
      $("#confirm-modal").hidden = true;
    });

    $("#modal-confirm").addEventListener("click", function () {
      $("#confirm-modal").hidden = true;
      resetAll();
    });

    $("#confirm-modal").addEventListener("click", function (event) {
      if (event.target === this) this.hidden = true;
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !$("#confirm-modal").hidden) {
        $("#confirm-modal").hidden = true;
      }
    });

    $("#budget-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var input = $("#budget-amount");
      if (setBudget(input.value)) input.value = "";
    });

    $("#category-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var input = $("#category-name");
      if (addCategory(input.value)) input.value = "";
    });

    $("#expense-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var amount = $("#expense-amount");
      var category = $("#expense-category");
      var date = $("#expense-date");
      var note = $("#expense-note");
      if (addExpense(amount.value, category.value, date.value, note.value)) {
        amount.value = "";
        note.value = "";
      }
    });

    // Default date to today on load
    var dateInput = $("#expense-date");
    if (!dateInput.value) dateInput.value = todayString();
  }

  /* ---------- Toast styles ---------- */

  function injectToastStyle() {
    var style = document.createElement("style");
    style.textContent = ".toast{position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);" +
      "background:#1a1e2c;color:#fff;padding:.65rem 1.1rem;border-radius:8px;font-size:.85rem;" +
      "font-weight:500;box-shadow:0 8px 24px rgba(0,0,0,.18);z-index:300;animation:slideUp .2s ease}";

    if (!document.querySelector(".toast")) {
      var slide = document.createElement("style");
      slide.textContent = "@keyframes slideUp{from{opacity:0;transform:translate(-50%,8px)}" +
        "to{opacity:1;transform:translate(-50%,0)}}";
      document.head.appendChild(slide);
    }
    document.head.appendChild(style);
  }

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    collectElements();
    injectToastStyle();
    bindEvents();
    render();
  });
})();