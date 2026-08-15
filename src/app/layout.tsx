import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Legacy — AI-Powered Learning",
  description:
    "Upload study material and learn faster with AI-powered Q&A, summaries, and flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('legacy_theme');
                  var theme = stored
                    ? stored
                    : (
                        window.matchMedia(
                          '(prefers-color-scheme: light)'
                        ).matches
                          ? 'light'
                          : 'dark'
                      );

                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
