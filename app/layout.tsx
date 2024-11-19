import type { Metadata } from "next";
import "./globals.css";
import {Toaster} from 'sonner'
import { ThemeProvider } from "@/components/themes/theme-provider";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { EdgeStoreProvider } from '../lib/edgestore';
 

export const metadata: Metadata = {
  title: "Jottsy",
  description: "Notion clone created with nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <head>
  <link rel="icon" href="/jottsy.png" type="image/svg+xml" />
        </head>
      <body
        className={`font-mono antialiased`}
      >
      <ConvexClientProvider>
      <EdgeStoreProvider>

              <ThemeProvider
                      attribute="class"
                      defaultTheme="dark"
                      enableSystem
                      disableTransitionOnChange
                      >
                        
        {children}
        <ModalProvider/>
<Toaster position="top-right" />
        </ThemeProvider>
                        </EdgeStoreProvider>
                  </ConvexClientProvider>
         </body>
    </html>
  );
}
