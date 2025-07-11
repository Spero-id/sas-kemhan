import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/common/utils/Provider";
import { SessionProvider } from "next-auth/react";
import 'leaflet/dist/leaflet.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const metadata: Metadata = {
  title: "EYESEE",
  description: "Generated by Rafi",
  other: {
    'http-equiv': 'Content-Security-Policy',
    'content': 'upgrade-insecure-requests',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
