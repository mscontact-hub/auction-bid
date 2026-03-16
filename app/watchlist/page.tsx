'use client';

import { useAuctionStore } from '@/store/useAuctionStore';
import { AuctionCard } from '@/components/auction/AuctionCard';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  const { auctions, watchlist } = useAuctionStore();
  const watchedAuctions = auctions.filter(a => watchlist.includes(a.id));

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter">VELO<span className="text-zinc-400">AUCTION</span></Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
            <div className="w-8 h-8 rounded-full bg-zinc-100" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              Your Watchlist
            </h1>
            <p className="text-zinc-500">You are tracking {watchedAuctions.length} vehicles.</p>
          </div>
        </div>

        {watchedAuctions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchedAuctions.map((vehicle) => (
              <AuctionCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your watchlist is empty</h3>
            <p className="text-zinc-500 mb-8">Start exploring auctions and save your favorites.</p>
            <Link href="/">
              <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all">
                Browse Auctions
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
