# Product Requirements Document (PRD)

## Fortune Budget Tracking

**Product Name:** Fortune Budget Tracking
**Product Type:** Small Business Budget and Expense Tracking Web Application
**Current Version:** 1.0.0
**Document Status:** Implementation and Prototype Development
**Primary Users:** Small business owners and entrepreneurs
**Development Approach:** AI-assisted development with human review and steering

---

# 1. Product Overview

Fortune Budget Tracking is a lightweight web application designed to help small business owners and entrepreneurs plan their business spending, record expenses, monitor their budget, and identify when spending is approaching or exceeding planned limits.

The application focuses on simplicity. Instead of providing a complex accounting system with payroll, banking integrations, taxation, and other advanced accounting functions, Fortune Budget Tracking provides the essential tools needed to understand daily and monthly business spending.

The current application is a working local/static prototype using HTML5, CSS3, Vanilla JavaScript, and browser localStorage.

The application will initially operate locally for development and testing. Future versions may introduce user accounts, a persistent database, cloud backup, and additional financial management features.

---

# 2. Problem Statement

Many small business owners manage their business expenses using notebooks, spreadsheets, calculators, or memory.

This can make it difficult to:

* Plan how much can be spent each day.
* Track expenses consistently.
* Know how much of the monthly budget has been used.
* Determine how much money remains.
* Identify categories where spending is increasing.
* Avoid exceeding the available business budget.
* Make informed day-to-day spending decisions.

Existing accounting applications can also be too complex for small businesses that only need a simple way to monitor their spending.

Fortune Budget Tracking addresses this problem by providing a simple, low-friction budgeting and expense-tracking interface.

---

# 3. Product Vision

The vision of Fortune Budget Tracking is to provide small business owners with a simple financial planning tool that makes daily business spending easier to understand and control.

The product should allow a user to answer three basic questions quickly:

1. How much have I planned to spend?
2. How much have I already spent?
3. How much can I still spend?

---

# 4. Target Users

## 4.1 Primary Users

### Small Business Owners

Examples include:

* Retail shop owners
* Small food businesses
* Fashion businesses
* Service providers
* Small-scale traders
* Freelancers
* Home-based businesses

### Entrepreneurs

Entrepreneurs who need a simple way to monitor operating expenses and maintain spending discipline.

---

# 5. Product Goals

The application should:

1. Allow users to define a monthly business budget.
2. Allow users to create spending categories.
3. Calculate an appropriate daily spending plan.
4. Allow users to record daily expenses.
5. Calculate total spending.
6. Calculate remaining budget.
7. Compare actual spending with planned spending.
8. Provide visual spending indicators.
9. Warn users when spending approaches defined limits.
10. Store prototype data locally so that the application can work without a backend.

---

# 6. Product Scope

## 6.1 MVP Scope

The Minimum Viable Product will include:

* Monthly budget setup
* Spending categories
* Daily spending plan
* Expense recording
* Expense amount
* Expense category
* Expense date
* Optional expense note
* Total spending calculation
* Remaining budget calculation
* Spending progress
* Daily spending comparison
* Budget alerts
* Local data persistence
* Responsive interface

---

# 7. Core Features

## 7.1 Monthly Budget

The user should be able to enter a monthly business budget.

Example:

```text
Monthly Budget: ₦500,000
```

The system should use this amount as the basis for budget calculations.

---

## 7.2 Spending Categories

Users should be able to organize expenses into categories.

Example categories:

* Supplies
* Transportation
* Utilities
* Marketing
* Rent
* Staff
* Internet
* Maintenance
* Other

Categories should make it easier for users to understand where their money is going.

---

## 7.3 Daily Spending Plan

The system should calculate a recommended daily spending amount based on the remaining budget and remaining days in the month.

The planned calculation is:

```text
Daily Spending Plan =
Remaining Budget ÷ Remaining Days
```

This calculation should adjust as the user records additional expenses.

---

## 7.4 Record Expense

The application should allow the user to record an expense.

Required information:

* Amount
* Category
* Date

Optional information:

* Description/note

Example:

```text
Amount: ₦15,000
Category: Supplies
Date: 25/09/2026
Note: Purchased packaging materials
```

---

## 7.5 Dashboard

The dashboard should provide an overview of the user's current financial position.

The dashboard should display information such as:

* Monthly budget
* Total spending
* Remaining budget
* Daily spending plan
* Today's spending
* Budget utilization
* Alerts

Example:

```text
Monthly Budget       ₦500,000
Total Spending       ₦275,000
Remaining Budget     ₦225,000
Today's Spending     ₦12,500
Daily Plan           ₦15,000
```

---

## 7.6 Spending Progress

The application should visually show how much of the monthly budget has been used.

Example:

```text
Budget Used: 55%
Remaining: 45%
```

The visual indicator should make it easy for users to understand their financial position without performing calculations manually.

---

## 7.7 Budget Alerts

The application should provide alerts when spending approaches or exceeds defined limits.

Initial alert rules:

* Monthly spending reaches 80% of the budget.
* Monthly spending exceeds the budget.
* Today's spending reaches 80% of the daily plan.
* Today's spending exceeds the daily plan.

Example:

```text
Warning:
You have used 82% of your monthly budget.
```

---

# 8. Main User Journey

The primary user journey is:

```text
Open Application
       ↓
Set Monthly Budget
       ↓
Create Spending Categories
       ↓
View Daily Spending Plan
       ↓
Record Expenses
       ↓
Dashboard Updates
       ↓
Monitor Spending
       ↓
Check Remaining Budget
       ↓
Receive Alerts When Necessary
```

The user should be able to complete the main workflow without needing accounting knowledge.

---

# 9. User Requirements

## 9.1 Budget Management

The user should be able to:

* Enter a monthly budget.
* View the current budget.
* See the amount spent.
* See the remaining amount.

## 9.2 Expense Management

The user should be able to:

* Add an expense.
* Select a category.
* Enter an amount.
* Select a date.
* Add an optional note.
* View recorded expenses.

## 9.3 Monitoring

The user should be able to:

* View spending progress.
* Compare spending with the daily plan.
* See remaining budget.
* Receive budget warnings.

---

# 10. Current Technology Architecture

The current prototype uses a lightweight frontend architecture.

| Component         | Current Technology     |
| ----------------- | ---------------------- |
| Frontend          | HTML5                  |
| Styling           | CSS3                   |
| Application Logic | Vanilla JavaScript ES6 |
| Data Storage      | Browser localStorage   |
| Database          | None                   |
| Authentication    | None                   |
| File Storage      | None                   |
| Backend           | None                   |
| Deployment        | Static web hosting     |

The current prototype does not require a build process, package manager, or external backend.

---

# 11. Local Development Requirement

For the current assessment prototype, the application and its data should run locally.

The prototype should be testable using a local browser and, where appropriate, a simple local server.

No production database or cloud infrastructure is required for the current assessment phase.

The application should use mock/test data during development.

No real customer financial information should be committed to the repository.

---

# 12. Data Storage

The current prototype uses browser `localStorage`.

This allows the application to retain user-entered data in the browser without requiring a backend.

Current stored information may include:

* Monthly budget
* Spending categories
* Expenses
* Application settings

### Limitation

LocalStorage is appropriate for the current prototype but is not intended to provide secure multi-user cloud storage.

A future version should use a persistent database.

---

# 13. Authentication

Authentication is **not implemented in the current prototype**.

The current application does not require user accounts.

Future versions may introduce authentication so that individual business owners can securely access their own financial records.

Potential future authentication requirements include:

* User registration
* Login
* Logout
* Password recovery
* Session management
* User-specific data access

---

# 14. Database

There is currently no external database.

The prototype uses browser localStorage.

For a future production version, a persistent database should be introduced to support:

* User accounts
* Multiple businesses
* Persistent expenses
* Categories
* Financial reports
* Cloud backup
* Multi-device access

The specific production database technology will be evaluated during a future implementation phase.

---

# 15. File Storage

The current prototype does not require file storage.

Future versions may introduce cloud file storage if features such as:

* Receipt uploads
* Business documents
* Expense attachments
* Report exports

are implemented.

---

# 16. User Interface and Design Requirements

The interface should be:

* Simple
* Professional
* Clean
* Responsive
* Easy to understand
* Suitable for desktop and mobile screens

The design should prioritize important financial information.

The dashboard should make the following information easy to identify:

1. Monthly budget
2. Total spending
3. Remaining budget
4. Daily spending plan
5. Alerts

Buttons and forms should use clear labels.

The application should avoid unnecessary visual complexity.

---

# 17. Design Preview

A separate file called:

```text
design.html
```

will be created as part of the Lesson 6 implementation.

The design preview should demonstrate:

* Product title
* Dashboard layout
* Financial summary cards
* Styled buttons
* Sample expense input
* Typography
* Color system
* Responsive layout

The design preview is intended to provide a visual representation of the product before or alongside implementation.

---

# 18. Design Refinement Requirement

At least one specific design refinement will be requested from the AI development tool.

The selected refinement will focus on improving usability rather than adding unnecessary features.

Example refinement:

> Improve the dashboard hierarchy, spacing, button styling, and responsive layout while keeping the interface simple for small business users.

The completed refinement and the reason for the change will be documented in this PRD.

---

# 19. AI-Assisted Development Plan

Open Code will be used as the AI coding assistant for the implementation process.

The AI will not be allowed to make all product decisions without human review.

The development process will follow:

```text
PRD
 ↓
AI Review
 ↓
Implementation Plan
 ↓
Human Steering Decision
 ↓
Design Preview
 ↓
Design Refinement
 ↓
Prototype Improvements
 ↓
Testing
 ↓
Documentation
 ↓
GitHub Submission
```

---

# 20. Implementation Phases

## Phase 1 — Product and Requirements Review

### Activities

* Read and review the PRD.
* Inspect the existing Fortune Budget Tracking code.
* Identify current features.
* Identify missing requirements.
* Confirm the prototype scope.

### Expected Output

A clear implementation plan based on the existing project.

---

## Phase 2 — Implementation Planning

The AI coding tool should create an ordered implementation plan.

The plan should identify:

* Existing functionality
* Required improvements
* Design work
* Testing tasks
* Documentation tasks
* Future development tasks

---

## Phase 3 — Design Preview

Create:

```text
design.html
```

The preview should demonstrate the proposed interface and visual direction.

---

## Phase 4 — Initial Working Prototype and Design Refinement

The existing Fortune Budget Tracking application will be improved while preserving its lightweight architecture.

The prototype should demonstrate the core budgeting and expense workflow.

The design will also receive at least one documented refinement.

### Current Phase Reached

**Phase 4 – Initial Working Prototype and Design Refinement.**

The application already has a functional local/static prototype with budget management, spending categories, expense recording, spending calculations, alerts, responsive styling, and localStorage persistence.

---

## Phase 5 — Testing and Validation

The application will be tested using mock data.

Testing will verify:

* Budget entry
* Expense entry
* Category selection
* Spending calculations
* Remaining budget
* Daily spending plan
* Alert thresholds
* Local data persistence
* Responsive interface

---

## Phase 6 — Documentation and GitHub Submission

The final prototype will be documented and pushed to the public GitHub repository.

Required documentation includes:

* PRD
* README
* Design preview
* Implementation progress
* AI steering decisions
* Design refinement
* Future roadmap

---

# 21. AI Steering Decision

A key implementation decision is to retain the existing **Vanilla JavaScript architecture** rather than migrate the application to a framework such as React.

### Decision

**Keep HTML5, CSS3, and Vanilla JavaScript for the current prototype.**

### Reason

The existing application is already functional, lightweight, responsive, and dependency-free.

Migrating to a framework at this stage would introduce additional complexity without being necessary for the Lesson 6 prototype requirements.

This decision also demonstrates human steering of the AI development process.

The architecture can be reconsidered if future requirements require a larger component-based application.

---

# 22. Security and Privacy Requirements

The application should not contain:

* API keys
* Passwords
* Authentication tokens
* Private credentials
* Secret keys
* Real customer financial records

Development and assessment should use mock/test information.

Because the current prototype uses localStorage, users should be informed that browser-stored data may be lost when browser storage is cleared.

A production version must introduce stronger security controls before handling sensitive financial information.

---

# 23. Non-Functional Requirements

## Performance

The application should load quickly and remain responsive on normal desktop and mobile browsers.

## Usability

A first-time user should be able to understand the main dashboard without extensive instructions.

## Responsiveness

The interface should work on:

* Desktop
* Laptop
* Tablet
* Mobile

## Maintainability

The code should remain organized and understandable.

## Accessibility

Forms should have clear labels and interactive elements should be usable with standard keyboard and browser controls where practical.

---

# 24. Testing Acceptance Criteria

The prototype will be considered functional when:

* A user can enter a monthly budget.
* A user can create or select spending categories.
* A user can record an expense.
* The total spending updates correctly.
* The remaining budget updates correctly.
* The daily spending plan is calculated.
* Spending progress is displayed.
* Budget alerts appear when thresholds are reached.
* Data persists during normal browser use.
* The application works locally.
* The design preview is available.
* The project is documented in GitHub.

---

# 25. Current Implementation Status

### Built

The existing Fortune Budget Tracking prototype includes:

* Responsive web interface
* Monthly budget management
* Spending categories
* Daily spending plan
* Expense recording
* Spending calculations
* Remaining budget
* Spending progress indicators
* Budget alerts
* LocalStorage persistence
* HTML5/CSS3/Vanilla JavaScript implementation
* Public GitHub repository
* Live test deployment

### Current Phase

**Phase 4 – Initial Working Prototype and Design Refinement**

---

# 26. Next Development Tasks

The immediate next tasks are:

1. Review the existing implementation against this PRD.
2. Create the Lesson 6 implementation plan using Open Code.
3. Create `design.html`.
4. Apply and document one design refinement.
5. Improve the prototype where requirements are incomplete.
6. Test the main user workflows.
7. Update the README.
8. Commit the changes to GitHub.
9. Record a short demonstration.
10. Submit the repository and demonstration link.

---

# 27. Future Roadmap

Future versions may include:

### Version 2

* CSV expense export
* Improved expense editing
* Expense deletion confirmation
* More detailed reports
* Monthly budget history
* Better category management

### Version 3

* User authentication
* Persistent cloud database
* Multiple business profiles
* Cloud backup
* Multi-device access

### Version 4

* Mobile/PWA support
* Advanced financial reports
* Receipt attachments
* Business performance analytics
* Additional financial planning tools

These future features are outside the current Lesson 6 prototype scope.

---

# 28. Out of Scope for the Current Assessment

The following are not required for the current Lesson 6 prototype:

* Production authentication
* Real payment processing
* Bank integration
* Real financial transactions
* Production cloud database
* Cloud file storage
* Mobile application
* Complex accounting
* Payroll
* Tax management
* Multi-branch management
* Advanced financial analytics

These may be considered in future development.

---

# 29. Project Structure

The current project structure is:

```text
Qubators_Fortune-Budget-Tracking/
│
├── index.html
├── styles.css
├── app.js
├── README.md
└── PRD.md
```

The Lesson 6 implementation will add:

```text
design.html
```

Additional files may be introduced only when required by the implementation.

---

# 30. Success Criteria

The Lesson 6 implementation will be successful when:

1. The existing Fortune Budget Tracking application remains functional.
2. The PRD accurately describes the product and implementation.
3. An AI-generated implementation plan is created.
4. Human steering decisions are documented.
5. A visual `design.html` preview is created.
6. At least one design refinement is requested and implemented.
7. The local prototype demonstrates the core product workflow.
8. The implementation uses mock/test data.
9. No credentials or secrets are committed.
10. The project is available in a public GitHub repository.
11. A short demonstration video shows the completed work.

---

# 31. Product Development Principle

Fortune Budget Tracking will follow a **simple-first development approach**.

The goal is not to add as many features as possible. The goal is to make the core budgeting and expense-tracking workflow easy for small business owners to understand and use.

Future complexity should only be introduced when it solves a clear user or business problem.

---

# 32. Final Product Statement

Fortune Budget Tracking is a lightweight budgeting and expense management application designed to help small business owners understand and control their daily and monthly business spending.

The current implementation provides a functional local prototype. The next development stage focuses on refining the design, validating the core workflows, documenting AI-assisted development decisions, and preparing the project for future expansion into a more complete business financial management platform.
