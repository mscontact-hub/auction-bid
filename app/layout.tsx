import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VeloAuction - Premium Vehicle Auctions',
  description: 'Bid on the world\'s most exciting vehicles in real-time.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning className="antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
