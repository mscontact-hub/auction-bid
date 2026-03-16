'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gavel, 
  Heart, 
  Trophy, 
  User, 
  CreditCard,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Bids', icon: Gavel, href: '/dashboard/bids' },
  { label: 'Watchlist', icon: Heart, href: '/watchlist' },
  { label: 'Won Auctions', icon: Trophy, href: '/dashboard/won' },
  { label: 'Profile', icon: User, href: '/profile' },
  { label: 'Payment Methods', icon: CreditCard, href: '/dashboard/payments' },
];

export function UserDashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col h-[calc(100vh-80px)] sticky top-20 border-r border-zinc-100 pr-6">
      <nav className="flex-grow space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-black text-white shadow-lg shadow-black/10" 
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-zinc-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
