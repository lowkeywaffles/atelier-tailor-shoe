import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";
import "./globals.css";

const f0 = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], style: ["normal", "italic"] });
const f1 = Jost({ variable: "--font-jost", subsets: ["latin"] });

const EN = strings.en as Record<string, string>;
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%238a4b24'/%3E%3Crect x='7' y='7' width='50' height='50' rx='9' fill='none' stroke='%23d9a868' stroke-width='2' stroke-dasharray='4 3'/%3E%3Ctext x='32' y='43' text-anchor='middle' font-family='Georgia' font-style='italic' font-size='30' fill='%23f4e7d3'%3EA%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#8a4b24" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${f0.variable} ${f1.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
