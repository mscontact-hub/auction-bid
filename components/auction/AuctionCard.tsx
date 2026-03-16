'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Timer, Gavel, MapPin, Users } from 'lucide-react';
import { Vehicle, useAuctionStore } from '@/store/useAuctionStore';
import { Card, Badge } from '@/components/ui/base';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Toast } from '@/components/ui/overlays';

export function AuctionCard({ vehicle }: { vehicle: Vehicle }) {
  const { timeLeft, isCritical } = useCountdown(vehicle.endTime);
  const { watchlist, toggleWatchlist } = useAuctionStore();
  const [showToast, setShowToast] = useState(false);
  const isWatched = watchlist.includes(vehicle.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWatchlist(vehicle.id);
    if (!isWatched) setShowToast(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card className="group flex flex-col h-full border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
          <Link href={`/auctions/${vehicle.slug}`} className="relative aspect-[4/3] block overflow-hidden">
            <Image
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-3 left-3 flex gap-2">
              {vehicle.reserveMet ? (
                <Badge variant="success" className="shadow-lg">No Reserve</Badge>
              ) : (
                <Badge variant="warning" className="shadow-lg">Reserve Not Met</Badge>
              )}
              {vehicle.bidsCount > 20 && (
                <Badge variant="danger" className="shadow-lg animate-pulse">Hot Auction</Badge>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleWatchlist}
              className={cn(
                "absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10",
                isWatched ? "bg-red-500 text-white shadow-red-500/40 shadow-lg" : "bg-black/20 text-white hover:bg-black/40"
              )}
            >
              <Heart className={cn("w-4 h-4 transition-transform", isWatched && "fill-current scale-110")} />
            </motion.button>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <MapPin className="w-3 h-3" />
                {vehicle.region}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Users className="w-3 h-3" />
                12 watching
              </div>
            </div>
          </Link>

          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-1">
              <Link href={`/auctions/${vehicle.slug}`} className="hover:text-zinc-600 transition-colors">
                <h3 className="font-black text-xl leading-tight tracking-tight">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-zinc-100">
              <div>
                <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">Current Bid</p>
                <p className="font-mono font-black text-2xl tracking-tighter">${vehicle.currentBid.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">Time Left</p>
                <div className={cn(
                  "flex items-center justify-end gap-1.5 font-mono font-black text-lg tracking-tighter",
                  isCritical ? "text-red-600" : "text-zinc-900"
                )}>
                  <Timer className={cn("w-4 h-4", isCritical && "animate-pulse")} />
                  <span>{timeLeft}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Gavel className="w-3.5 h-3.5" />
                <span>{vehicle.bidsCount} bids</span>
              </div>
              <div className="h-1 w-1 bg-zinc-200 rounded-full" />
              <span>Ends {new Date(vehicle.endTime).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <Toast 
        message="Added to your watchlist" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
}
