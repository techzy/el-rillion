import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";

const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext", "greek"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://el-rillion.lifeofjeso.ca"),
  title: { default: "EL-RILLION · one in a megaohm", template: "%s · EL-RILLION" },
  description:
    "A daily electrical-engineering category game. Name as many answers as you can in 90 seconds. Rare answers score more, and one hidden answer per prompt is the Megaohm.",
  openGraph: {
    title: "EL-RILLION · one in a megaohm",
    description: "The daily electrical-engineering category game. Find the Megaohm.",
    url: "https://el-rillion.lifeofjeso.ca",
    siteName: "EL-RILLION",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#040906", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <AuthProvider>
          <Header />
          <main className="wrap">{children}</main>
          <footer className="footer">
            <div className="wrap spread">
              <span>EL-RILLION · one in a megaohm.</span>
              <span>Daily prompt resets at midnight Eastern.</span>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
