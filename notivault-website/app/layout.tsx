import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL("https://baisalya.com/notivault-website/");

  return {
    metadataBase,
    title: {
      default: "NotiVault — Keep Chat Notifications After They’re Deleted",
      template: "%s | NotiVault",
    },
    description:
      "Preserve chat notification previews before they are deleted. NotiVault keeps selected messages and notification-exposed media private and searchable on your Android device.",
    applicationName: "NotiVault",
    authors: [{ name: "Baishalya Roul", url: "https://baisalya.com/" }],
    alternates: { canonical: "https://baisalya.com/notivault-website/" },
    keywords: [
      "Android notification history",
      "notification vault",
      "private notification manager",
      "local notification history",
      "deleted message notification history",
      "WhatsApp notification history",
      "NotiVault",
    ],
    openGraph: {
      type: "website",
      title: "NotiVault — Deleted from the chat. Still safe in your vault.",
      description:
        "Preserve selected chat notifications after setup—even when a message is later deleted. Media is saved when the notification exposes it.",
      siteName: "NotiVault",
      url: "https://baisalya.com/notivault-website/",
      images: [{ url: "/og-deleted-message.png", width: 1733, height: 907, alt: "NotiVault preserves chat notification previews that are later deleted" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "NotiVault — Deleted from the chat. Still safe in your vault.",
      description: "Captured from notifications after setup. Private and local-first on Android.",
      images: ["/og-deleted-message.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
