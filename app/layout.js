export const metadata = {
  title: "Daily Log — GitHub Automation",
  description: "Automated daily commit log powered by GitHub Actions",
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
