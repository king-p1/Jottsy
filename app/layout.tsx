import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/themes/theme-provider";

 
export const metadata: Metadata = {
  title: "Jotssy",
  description: "Notion clone created with nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-mono antialiased`}
      >
  <ClerkProvider
      appearance={{
        baseTheme:dark,
        variables:{colorPrimary:'#3371FF',
          fontSize:'16px'
        }
      }}
      >
              <ThemeProvider
                      attribute="class"
                      defaultTheme="dark"
                      enableSystem
                      disableTransitionOnChange
                    >
        {children}
        </ThemeProvider>
        </ClerkProvider>      </body>
    </html>
  );
}
