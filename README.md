# SpendWise — Personal Budget Tracker

SpendWise is a responsive, browser-based personal finance tracker. Its interface is organized into separate pages so each navigation item opens a focused workspace.

## Live Website

**Netlify:** https://spendwisebudgettracker.netlify.app/

**GitHub repository:** https://github.com/Nhialmabior/budget-tracker

## Pages

- **Overview** (`index.html`): monthly income, expenses, balance, budget progress and recent transactions.
- **Transactions** (`transactions.html`): add, edit, delete, search, filter and export income and expense records.
- **Budget** (`budget.html`): set a monthly spending limit and monitor the remaining amount.
- **Reports** (`reports.html`): review totals, spending by category, daily expense activity and CSV export.
- **Settings** (`settings.html`): choose the display currency, switch themes and clear local application data.

## Features

- Separate pages with direct navigation links.
- Responsive layout for desktop, tablet and mobile.
- Shared transaction and preference data across all pages.
- Income and expense categories, dates, descriptions and optional notes.
- Edit and delete transactions.
- Monthly income, expense and net-balance summaries.
- Monthly spending limit and progress indicator.
- Category breakdown and daily expense chart.
- Search and filter transactions.
- CSV export.
- USD, KES, SSP, EUR and GBP display formats.
- Light and dark themes.
- Browser localStorage persistence.

## Technologies

- HTML5
- CSS3, CSS Grid and Flexbox
- Vanilla JavaScript (ES6+)
- Browser localStorage
- Git and GitHub
- Netlify continuous deployment
- Google Fonts (DM Sans and Space Grotesk)

## Project Structure

```text
budget-tracker/
├── Assets/
│   └── Logo.jpg
├── index.html
├── transactions.html
├── budget.html
├── reports.html
├── settings.html
├── styles.css
├── script.js
├── js/
│   ├── app.js
│   ├── dashboard.js
│   ├── transactions.js
│   ├── budget.js
│   ├── reports.js
│   └── settings.js
└── README.md
```

## Run Locally

1. Clone the repository:
   `git clone https://github.com/Nhialmabior/budget-tracker.git`
2. Open the project folder.
3. Open `index.html` in a modern browser, or use the VS Code Live Server extension.
4. Navigate between the pages using the sidebar.

No build command or package installation is required.

## Data and Privacy Notes

SpendWise stores its transactions and preferences in the browser's localStorage. All five pages use the same storage key, so changes made on one page are reflected on the others in that browser. Data does not synchronize between browsers or devices and may be lost if browser site data is cleared. The currency selector changes the display format only; it does not perform exchange-rate conversion. This learning project does not use a remote database or user accounts.

## Deployment

The repository is connected to Netlify for continuous deployment from the `main` branch. The site is a static HTML, CSS and JavaScript application, so the publish directory is the repository root and no build command is needed. New commits to the connected branch trigger a Netlify deployment.

## Challenges and Lessons

- Separating the interface into pages while keeping one shared data source.
- Maintaining consistent navigation, styles and responsive behavior across pages.
- Making sure relative asset and script paths work on every page.
- Using localStorage to preserve data across page navigation.
- Testing a static site at multiple viewport sizes and checking that each page's controls work.

## Author

**Nhial Mabior Garang**

---

This is a learning project and client-side prototype, not a secure financial application.