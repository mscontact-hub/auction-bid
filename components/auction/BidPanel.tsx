'use client';

import { useState } from 'react';
import { Timer, Gavel, Info, ShieldCheck, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Vehicle, useAuctionStore } from '@/store/useAuctionStore';
import { Card, Button, Input, Badge } from '@/components/ui/base';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Modal } from '@/components/ui/overlays';

export function BidPanel({ vehicle }: { vehicle: Vehicle }) {
  const { timeLeft, isCritical, isEnded } = useCountdown(vehicle.endTime);
  const [bidAmount, setBidAmount] = useState<string>((vehicle.currentBid + 500).toString());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const addBid = useAuctionStore((state) => state.addBid);

  const numericBid = parseInt(bidAmount) || 0;
  const serviceFee = Math.round(numericBid * 0.05);
  const total = numericBid + serviceFee;

  const handlePlaceBid = () => {
    if (numericBid <= vehicle.currentBid) return;
    setIsConfirmOpen(true);
  };

  const confirmBid = () => {
    addBid({
      id: Math.random().toString(36).substr(2, 9),
      auctionId: vehicle.id,
      bidderName: 'You',
      amount: numericBid,
      timestamp: new Date().toISOString(),
    });
    setIsConfirmOpen(false);
  };

  return (
    <>
      <div className="lg:sticky lg:top-24 space-y-4">
        <Card className="p-8 shadow-2xl border-none ring-1 ring-zinc-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Current Bid</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={vehicle.currentBid}
                  initial={{ scale: 1.2, color: '#10b981' }}
                  animate={{ scale: 1, color: '#000' }}
                  className="text-5xl font-mono font-black tracking-tighter"
                >
                  ${vehicle.currentBid.toLocaleString()}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Time Remaining</p>
              <p className={cn(
                "text-2xl font-mono font-black tracking-tighter",
                isCritical ? "text-red-600 animate-pulse" : "text-zinc-900"
              )}>
                {timeLeft}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <Info className="w-4 h-4" />
                <span>Reserve Status</span>
              </div>
              {vehicle.reserveMet ? (
                <Badge variant="success" className="px-3">Reserve Met</Badge>
              ) : (
                <Badge variant="warning" className="px-3">Reserve Not Met</Badge>
              )}
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-xs font-medium">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Verified Seller & Secure Transaction. Funds held in escrow.</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Place your bid</label>
                <span className="text-[10px] font-bold text-zinc-400">Min. Increment: $100</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-zinc-300 text-xl">$</span>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-9 h-16 text-2xl font-mono font-black tracking-tighter border-2 focus:border-black transition-all rounded-2xl"
                  min={vehicle.currentBid + 100}
                />
              </div>

              <AnimatePresence>
                {numericBid > vehicle.currentBid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                      Great bid! You will be the highest bidder.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-2 mt-3">
                {[500, 1000, 2500].map((inc) => (
                  <button
                    key={inc}
                    onClick={() => setBidAmount((vehicle.currentBid + inc).toString())}
                    className="flex-1 text-[10px] font-black uppercase tracking-widest py-2.5 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
                  >
                    +${inc}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl space-y-3 text-sm border border-zinc-100">
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Bid Amount</span>
                <span className="font-mono font-bold">${numericBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Service Fee (5%)</span>
                <span className="font-mono font-bold">${serviceFee.toLocaleString()}</span>
              </div>
              <div className="h-px bg-zinc-200 my-1" />
              <div className="flex justify-between font-black text-zinc-900 text-lg">
                <span>Total</span>
                <span className="font-mono tracking-tighter">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceBid}
              disabled={isEnded || numericBid <= vehicle.currentBid}
              className="w-full h-16 text-xl font-black uppercase tracking-widest gap-3 rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all"
            >
              <Gavel className="w-6 h-6" />
              {isEnded ? 'Auction Ended' : 'Place Bid'}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 uppercase font-black tracking-widest">
              <TrendingUp className="w-3 h-3" />
              <span>14 people currently bidding</span>
            </div>
          </div>
        </Card>

        {/* Mobile Sticky CTA (Hidden on Desktop) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-100 z-50 flex gap-4 items-center shadow-2xl">
          <div className="flex-grow">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Current Bid</p>
            <p className="text-xl font-mono font-black tracking-tighter">${vehicle.currentBid.toLocaleString()}</p>
          </div>
          <Button onClick={handlePlaceBid} className="h-12 px-8 rounded-xl font-black uppercase tracking-widest">
            Bid Now
          </Button>
        </div>
      </div>

      <Modal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Your Bid"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">
              You are about to place a bid for <span className="font-black">${numericBid.toLocaleString()}</span>. 
              If you win, you are legally obligated to complete the purchase.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-zinc-500">
              <span>Vehicle</span>
              <span className="font-bold text-black">{vehicle.year} {vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Your Bid</span>
              <span className="font-bold text-black">${numericBid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Service Fee</span>
              <span className="font-bold text-black">${serviceFee.toLocaleString()}</span>
            </div>
            <div className="h-px bg-zinc-100" />
            <div className="flex justify-between text-lg font-black">
              <span>Total Commitment</span>
              <span className="font-mono">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
            <Button className="flex-1 h-12" onClick={confirmBid}>Confirm Bid</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
