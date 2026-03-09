import "./globals.css"; // WAJIB ADA
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "../providers/convexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full m-0 p-0 overflow-hidden`}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}