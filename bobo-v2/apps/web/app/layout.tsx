import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bobo - Smart Baby Tracking for Modern Parents",
  description: "AI-powered baby tracking app with sleep predictions, feeding insights, and milestone guidance. Join thousands of parents using Bobo to track their baby's growth and development.",
  keywords: ["baby tracker", "parenting app", "sleep tracking", "baby milestones", "feeding log"],
  openGraph: {
    title: "Bobo - Smart Baby Tracking for Modern Parents",
    description: "AI-powered baby tracking with smart insights for your little one.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
