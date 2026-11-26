"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="7" fill="#06140c" stroke="#39ff88" strokeOpacity="0.5" />
      <path d="M4 16 h4 l2 -6 l3 12 l3 -12 l3 12 l3 -12 l2 6 h4" fill="none" stroke="#39ff88"
        strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const LINKS = [
  { href: "/", label: "Daily" },
  { href: "/packs", label: "Packs" },
  { href: "/leaderboard", label: "Leaderboards" },
  { href: "/how-to-play", label: "How to play" },
];

export function Header() {
  const path = usePathname();
  const { session, stats } = useAuth();
  const isActive = (href: string) => (href === "/" ? path === "/" || path.startsWith("/play/daily") : path.startsWith(href));
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="EL-RILLION home">
          <Logo /> EL-RILLION
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>{l.label}</Link>
          ))}
          <Link href="/account" className={path.startsWith("/account") ? "active" : ""}>
            {session ? (stats?.display_name ?? "Account") : "Sign in"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
