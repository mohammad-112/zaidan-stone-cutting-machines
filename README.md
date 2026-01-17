# Zaidan Stone Cutting Machines - Static ERP

A professional, serverless ERP and company website designed to run on GitHub Pages.

## How it Works
Since GitHub Pages is a static hosting service, we cannot use a traditional backend server (like Node.js + SQLite). Instead, this version uses **Browser LocalStorage** as the database.
- **Persistence:** Your data (Customers, Invoices) is saved in your browser. If you refresh the page, data remains.
- **Portability:** Works instantly on any server or computer without installation.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## How to Deploy to GitHub Pages

1. **Build the project:**
   This creates a `dist` folder containing the final HTML/CSS/JS files.
   ```bash
   npm run build
   ```

2. **Upload to GitHub:**
   - Create a repository on GitHub.
   - Upload the contents of the `dist` folder (or the whole project and configure GitHub Actions).
   - Enable "GitHub Pages" in the repository settings.

## Admin Credentials

- **Email**: `EyadZidan110099@admin.com`
- **Password**: `adminadmin990011@user.com`
