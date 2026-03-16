import { create } from 'zustand';

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  currentBid: number;
  reservePrice: number;
  reserveMet: boolean;
  endTime: string;
  image: string;
  images: string[];
  bidsCount: number;
  region: string;
  seller: string;
  description: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

interface AuctionState {
  auctions: Vehicle[];
  watchlist: string[];
  activeAuctionBids: Bid[];
  setAuctions: (auctions: Vehicle[]) => void;
  toggleWatchlist: (id: string) => void;
  addBid: (bid: Bid) => void;
  setActiveAuctionBids: (bids: Bid[]) => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  auctions: [],
  watchlist: [],
  activeAuctionBids: [],
  setAuctions: (auctions) => set({ auctions }),
  toggleWatchlist: (id) => set((state) => ({
    watchlist: state.watchlist.includes(id)
      ? state.watchlist.filter((i) => i !== id)
      : [...state.watchlist, id]
  })),
  addBid: (bid) => set((state) => ({
    activeAuctionBids: [bid, ...state.activeAuctionBids],
    auctions: state.auctions.map(a => 
      a.id === bid.auctionId 
        ? { ...a, currentBid: Math.max(a.currentBid, bid.amount), bidsCount: a.bidsCount + 1 }
        : a
    )
  })),
  setActiveAuctionBids: (bids) => set({ activeAuctionBids: bids }),
}));
