import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./provider";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ['400', '700'],
});

export const metadata = {
  title: "HireZilla",
  description: "AI Recruiter Voice Agent for Hiring",
  icons: {
    icon: "/iconn.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <Provider>

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${ubuntu.className}`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
