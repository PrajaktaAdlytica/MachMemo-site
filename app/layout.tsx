import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MachMemo - Machine memory for maintenance intelligence",
    template: "%s | MachMemo",
  },
  description:
    "MachMemo turns machine docs, faults, technician know-how, and health signals into reusable maintenance intelligence for European manufacturing teams.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "MachMemo - Machine memory for maintenance intelligence",
    description:
      "AI maintenance intelligence for manufacturing SMEs, machine shops, maintenance teams, and industrial suppliers.",
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
      <body>{children}</body>
    </html>
  );
}
