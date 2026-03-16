'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Share2, 
  Flag, 
  MapPin, 
  Calendar, 
  User, 
  ShieldCheck,
  Info,
  MessageSquare,
  Heart
} from 'lucide-react';
import { useAuctionStore } from '@/store/useAuctionStore';
import { MOCK_AUCTIONS } from '@/lib/mock-data';
import { ImageGallery } from '@/components/auction/ImageGallery';
import { BidPanel } from '@/components/auction/BidPanel';
import { BidHistoryTable } from '@/components/auction/BidHistoryTable';
import { useAuctionSocket } from '@/hooks/useAuctionSocket';
import { Card, Badge, Button } from '@/components/ui/base';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function AuctionDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { auctions, setAuctions, activeAuctionBids, setActiveAuctionBids, watchlist, toggleWatchlist } = useAuctionStore();
  
  const vehicle = auctions.find(a => a.slug === slug) || MOCK_AUCTIONS.find(a => a.slug === slug);
  const isWatched = vehicle ? watchlist.includes(vehicle.id) : false;
  
  useAuctionSocket(vehicle?.id);

  useEffect(() => {
    if (auctions.length === 0) {
      setAuctions(MOCK_AUCTIONS);
    }
  }, [auctions.length, setAuctions]);

  useEffect(() => {
    if (vehicle) {
      // Mock initial bids
      const initialBids = [
        {
          id: 'b1',
          auctionId: vehicle.id,
          bidderName: 'SpeedDemon',
          amount: vehicle.currentBid - 2000,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 'b2',
          auctionId: vehicle.id,
          bidderName: 'ClassicCollector',
          amount: vehicle.currentBid - 5000,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        }
      ];
      setActiveAuctionBids(initialBids);
    }
  }, [vehicle?.id, vehicle?.currentBid, setActiveAuctionBids]);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Auction not found</h2>
          <Button onClick={() => router.push('/')}>Return to Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-black tracking-tight hidden sm:block">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "rounded-xl gap-2 transition-all",
                isWatched ? "bg-red-50 border-red-100 text-red-600" : ""
              )}
              onClick={() => vehicle && toggleWatchlist(vehicle.id)}
            >
              <Heart className={cn("w-4 h-4", isWatched ? "fill-current" : "")} />
              <span className="hidden sm:inline">{isWatched ? 'Watching' : 'Watchlist'}</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              <Flag className="w-4 h-4" />
              <span className="hidden sm:inline">Report</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (70%) */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <ImageGallery images={vehicle.images} />
            </section>

            <section className="space-y-8">
              <div className="flex flex-wrap gap-6 text-sm font-medium text-zinc-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {vehicle.region}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Ends {new Date(vehicle.endTime).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Seller: <span className="text-black font-bold">{vehicle.seller}</span>
                </div>
              </div>

              <div className="prose prose-zinc max-w-none">
                <h2 className="text-3xl font-black tracking-tight mb-4">Vehicle Description</h2>
                <p className="text-zinc-600 leading-relaxed text-lg">
                  {vehicle.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Body Style', value: 'Coupe' },
                  { label: 'Engine', value: '4.0L Flat-6' },
                  { label: 'Transmission', value: '6-Speed Manual' },
                  { label: 'Drivetrain', value: 'RWD' },
                  { label: 'Mileage', value: '12,450 mi' },
                  { label: 'Exterior', value: 'Chalk' },
                  { label: 'Interior', value: 'Black Leather' },
                  { label: 'Title', value: 'Clean' },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="font-bold text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tight">Bid History</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Live Updates
                </div>
              </div>
              <Card className="p-6 border-zinc-100 shadow-sm">
                <BidHistoryTable bids={activeAuctionBids} />
              </Card>
            </section>

            <section className="pb-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tight">Comments</h2>
                <Button variant="outline" className="rounded-xl gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Add Comment
                </Button>
              </div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">AutoEnthusiast_{i}</span>
                        <span className="text-xs text-zinc-400">2 hours ago</span>
                      </div>
                      <p className="text-zinc-600 text-sm">
                        This is an incredible example of the {vehicle.model}. The maintenance records look impeccable. Good luck to the bidders!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (30%) - Sticky Bid Panel */}
          <div className="relative">
            <BidPanel vehicle={vehicle} />
          </div>
        </div>
      </main>
    </div>
  );
}
