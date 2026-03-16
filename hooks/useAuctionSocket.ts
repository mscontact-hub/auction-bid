'use client';

import { useEffect } from 'react';
import { useAuctionStore } from '@/store/useAuctionStore';

// Mocking Pusher/WebSocket behavior
export function useAuctionSocket(auctionId?: string) {
  const addBid = useAuctionStore((state) => state.addBid);

  useEffect(() => {
    if (!auctionId) return;

    // Simulate real-time bids every 10-20 seconds for demo purposes
    const interval = setInterval(() => {
      const randomBidder = ['TurboFan', 'Roadster99', 'GearHead', 'V8Vibes'][Math.floor(Math.random() * 4)];
      const currentAuction = useAuctionStore.getState().auctions.find(a => a.id === auctionId);
      
      if (currentAuction) {
        const newAmount = currentAuction.currentBid + 500;
        const newBid = {
          id: Math.random().toString(36).substr(2, 9),
          auctionId,
          bidderName: randomBidder,
          amount: newAmount,
          timestamp: new Date().toISOString(),
        };
        
        // In a real app, this would come from a WebSocket event
        console.log('Real-time bid received:', newBid);
        addBid(newBid);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [auctionId, addBid]);
}
