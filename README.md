# SpendWise — Personal Budget Tracker

SpendWise is a responsive, browser-based personal finance dashboard for recording income and expenses, monitoring monthly budgets, and understanding spending habits.

## Live Website

**Netlify:** https://spendwisebudgettracker.netlify.app/

**GitHub repository:** https://github.com/Nhialmabior/budget-tracker

## Features

- Responsive layout for desktop, tablet, and mobile screens.
- Record income and expenses with descriptions, dates, categories, and optional notes.
- Edit and delete transactions.
- Monthly income, expense, and net-balance summaries.
- Set a monthly spending limit and monitor budget progress.
- Spending totals grouped by category.
- Daily expense chart for the selected month.
- Navigate between months.
- Search transactions and filter by income or expense.
- Export transactions for the selected month to CSV.
- Choose a display currency (USD, KES, SSP, EUR, or GBP).
- Light and dark display themes.
- Saves transactions and preferences in the browser using localStorage.

## Technologies Used

- HTML5
- CSS3, CSS Grid, and Flexbox
- Vanilla JavaScript (ES6+)
- Browser localStorage
- Git and GitHub
- Netlify continuous deployment
- Google Fonts (DM Sans and Space Grotesk)

## Project Structure

\`\`\`text
budget-tracker/
├── Assets/
│   └── Logo.jpg
├── index.html
├── styles.css
├── script.js
└── README.md
\`\`\`

## Getting Started Locally

1. Clone the repository:
   \`git clone https://github.com/Nhialmabior/budget-tracker.git\`
2. Open the project folder.
3. Open \`index.html\` in a modern browser, or use the VS Code Live Server extension.
4. Add transactions and set a monthly budget from the dashboard.

No build command or package installation is required.

## Data and Privacy Notes

SpendWise currently stores its data in the browser's localStorage. Data is specific to the browser and device being used; it does not synchronize between devices or browsers and may be lost if the browser's site data is cleared. The currency selector changes the display format only; it does not convert exchange rates. This version does not use a remote database or user accounts.

## GitHub Repository Information

- **Repository:** [Nhialmabior/budget-tracker](https://github.com/Nhialmabior/budget-tracker)
- **Default branch:** \`main\`
- **Visibility:** Public

## Deployment Process Summary

1. Organized the application into HTML, CSS, JavaScript, and asset files.
2. Pushed the source code to the public GitHub repository.
3. Connected the repository to Netlify.
4. Configured Netlify to publish the repository root as a static website, with no build command.
5. Set the custom Netlify site address.
6. Enabled continuous deployment from the GitHub \`main\` branch.
7. Committed application improvements to GitHub; Netlify detects new commits and creates deployments automatically.

## Challenges Encountered During Deployment

- Making sure the logo, stylesheet, and JavaScript paths work after publishing.
- Configuring the GitHub-to-Netlify connection and publish directory.
- Ensuring the layout adapts to different viewport sizes.
- Implementing browser-side data storage and validating user-entered amounts and dates.

## Lessons Learned

- Git and GitHub provide a reliable way to track and publish source-code changes.
- Netlify can automatically redeploy a static website when new commits reach the connected branch.
- Relative asset paths help static sites work across hosting environments.
- Responsive CSS requires testing at several screen widths, not only on a desktop.
- JavaScript can make a static dashboard interactive, while localStorage can preserve data in one browser.
- A successful deployment still needs functional, accessibility, and device testing.

## Author

**Nhial Mabior Garang**

---

This is a learning project and a client-side prototype. It is not a substitute for a secure financial application with authenticated accounts and server-side data storage.