# SpendWise - Personal Budget & Expense Tracker

## About the Project

SpendWise is a Personal Budget & Expense Tracker designed to help users
record and view their expenses in one place.

This project is being developed step by step throughout the course.
At this stage, the project focuses on HTML structure and CSS visual design.
JavaScript functionality will be introduced in later weeks.

## Project Files

### index.html

The `index.html` file provides the structure of the SpendWise application.

It contains:

- SpendWise page heading and introduction
- Add Expense form
- Expense name and amount inputs
- Expense category dropdown
- Add Expense button
- Expense table
- Five sample expense records
- How to use the tracker section
- SpendWise logo
- Embedded budgeting video

### style.css

The `style.css` file controls the visual appearance of the application.

It includes:

- Consistent color palette
- Google Fonts typography
- Page and section spacing
- Card-style sections
- Table borders and padding
- Table header styling
- Alternating table row colors
- Hover effects
- Form input styling
- Button styling
- Focus effects
- Border radius and box-model properties

## Expense Table

The expense table contains the following columns:

- Name
- Amount
- Category
- Date

Five sample expenses have been added for demonstration.

## Add Expense Form

The form contains:

- Expense Name
- Amount
- Category
- Add Expense button

The category dropdown includes:

- Food
- Transport
- Rent
- Entertainment
- Other

The button is currently not functional because JavaScript will be added
in a later stage of the project.

## Multimedia

The project includes:

- A SpendWise logo using an HTML image element.
- A budgeting video embedded using an iframe.

## Visual Design

The application uses a consistent blue and light background color palette.
The main sections are displayed as cards using padding, margins, borders,
and rounded corners.

Google Fonts are used to improve readability and create a clear visual
hierarchy between headings and body text.

## Technologies Used

- HTML5
- CSS3
- Google Fonts

## Future Development

Future versions of SpendWise will introduce JavaScript functionality,
allowing users to add and manage expenses dynamically.

The project will eventually become a fully functional budget and expense
tracking application.

## Week 4 - SpendWise Dashboard Shell

The SpendWise project was redesigned as a modern responsive dashboard using
CSS Grid and Flexbox.

### Dashboard Components

The dashboard contains:

- Sidebar navigation
- Dashboard header
- Six financial category cards
- Food
- Transport
- Rent
- Entertainment
- Savings
- Utilities

### CSS Grid

CSS Grid is used for the overall dashboard layout and the category card grid.

### Flexbox

Flexbox is used to arrange:

- Sidebar navigation
- Header content
- Card content
- Navigation items

### CSS Custom Properties

The color theme is defined using CSS variables inside `:root`, including
brand color, accent color, background color, surface color, and text colors.

### Responsive Design

A media query at 768px changes the dashboard to a single-column layout
for smaller screens.

### Micro-interactions

Dashboard cards include hover and keyboard focus effects using transform
and box-shadow transitions.

### Dark Theme

A dark theme is included using the `prefers-color-scheme: dark` media query.