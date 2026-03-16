'use client';

import { UserDashboardSidebar } from '@/components/dashboard/Sidebar';
import { Card, Badge, Button } from '@/components/ui/base';
import { useAuctionStore } from '@/store/useAuctionStore';
import { Timer, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';

function BidRow({ auctionId, userBid }: { auctionId: string, userBid: number }) {
  const auctions = useAuctionStore(state => state.auctions);
  const auction = auctions.find(a => a.id === auctionId);
  const { timeLeft, isCritical } = useCountdown(auction?.endTime || '');

  if (!auction) return null;

  const isWinning = userBid >= auction.currentBid;

  return (
    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-20 h-16 bg-zinc-100 rounded-lg overflow-hidden relative shrink-0">
          <img src={auction.image} alt={auction.model} className="w-full h-full object-cover" />
        </div>
        <div>
          <Link href={`/auctions/${auction.slug}`} className="font-bold hover:underline flex items-center gap-1">
            {auction.year} {auction.make} {auction.model}
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-zinc-500">Current: <span className="font-bold text-black">${auction.currentBid.toLocaleString()}</span></p>
            <div className="w-1 h-1 bg-zinc-300 rounded-full" />
            <p className="text-xs text-zinc-500">Your Bid: <span className="font-bold text-black">${userBid.toLocaleString()}</span></p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Time Left</p>
          <div className={cn("flex items-center gap-1 font-mono font-bold text-sm", isCritical ? "text-red-600" : "text-zinc-900")}>
            <Timer className="w-3 h-3" />
            {timeLeft}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isWinning ? "success" : "danger"}>
            {isWinning ? "Winning" : "Outbid"}
          </Badge>
          {!isWinning && (
            <Link href={`/auctions/${auction.slug}`}>
              <Button size="sm" className="h-8 text-xs">Bid Again</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBidsPage() {
  // Mocking user bids
  const myBids = [
    { auctionId: '1', amount: 85000 },
    { auctionId: '2', amount: 190000 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter">MY BIDS</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-12">
        <UserDashboardSidebar />
        
        <main className="flex-grow">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight mb-2">Active Bids</h2>
            <p className="text-zinc-500">Track your current bidding activity across all live auctions.</p>
          </div>

          <Card className="divide-y divide-zinc-100">
            {myBids.map((bid) => (
              <BidRow key={bid.auctionId} auctionId={bid.auctionId} userBid={bid.amount} />
            ))}
          </Card>
        </main>
      </div>
    </div>
  );
}
