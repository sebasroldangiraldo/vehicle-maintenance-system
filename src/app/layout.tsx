import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '../styles/global.scss';
import { AuthProvider } from "./auth-provider";

export const metadata: Metadata = {
    title: "Vehicle Maintenance System",
    description: "Sebastián Roldán Giraldo",
};

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en">
            <body className={poppins.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
};