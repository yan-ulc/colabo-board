import { Inter } from "next/font/google";
import { ConvexClientProvider } from "../providers/convexClientProvider";
import "./globals.css"; // WAJIB ADA

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full m-0 p-0 overflow-x-hidden`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
