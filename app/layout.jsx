import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          {/* LOGO SECTION */}
          <div className="logo">
            <span>🌿</span>
            EcoTrack
          </div>

          {/* NAV LINKS */}
          <div>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/actions">Log Actions</a>
            <a href="/goals">Goals</a>
            <a href="/recommendations">Recommendations</a>
            <a href="/profile">Profile</a>
          </div>
        </nav>

        <div className="page-container">
          {children}
        </div>
      </body>
    </html>
  );
}
