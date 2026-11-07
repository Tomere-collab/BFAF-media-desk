import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BFAF Media Desk | Media Accreditation",
  description: "Apply for media accreditation for the Bayelsa Food & Art Festival."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
