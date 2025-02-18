import { Noto_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import "../styles/global.css";
import "../styles/common.scss";
import { ToastContainer } from "react-toastify";
import MainLayout from "../layouts/MainLayout";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Socketing",
  description: "Next.js 13+ App Router Socketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/images/ticket.svg" />
      </head>
      <body className={notoSansKr.className}>
        <MainLayout>{children}</MainLayout>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  );
}
