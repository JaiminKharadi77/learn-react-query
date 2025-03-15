"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import 'bootstrap/dist/css/bootstrap.min.css';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/superheropage">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link href="/rqsuperheropage">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          {children}
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
