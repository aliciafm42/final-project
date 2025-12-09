import Link from "next/link";

export default function NavigationSidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/actions">Log Actions</Link>
        </li>
        <li>
          <Link href="/goals">Goals</Link>
        </li>
        <li>
          <Link href="/recommendations">Recommendations</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
