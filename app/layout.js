// ```javascript
// app/layout.js

import "./globals.css";

export const metadata = {
  title: "AI TestPilot | Software Testing Assistant",
  description:
    "Generate software test cases, record test outcomes, analyze reported failures, and export QA reports with AI assistance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

