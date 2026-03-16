'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useAuctionStore } from '@/store/useAuctionStore';
import { MOCK_AUCTIONS } from '@/lib/mock-data';
import { AuctionCard } from '@/components/auction/AuctionCard';
import { Input, Button, Badge } from '@/components/ui/base';
import { motion } from 'motion/react';

export default function AuctionListingPage() {
  const { auctions, setAuctions } = useAuctionStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setAuctions(MOCK_AUCTIONS);
  }, [setAuctions]);

  const filteredAuctions = auctions.filter(a => 
    `${a.make} ${a.model} ${a.year}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter">VELO<span className="text-zinc-400">AUCTION</span></Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-black">Auctions</Link>
            <Link href="/sell" className="text-zinc-500 hover:text-black">Sell a Car</Link>
            <Link href="/about" className="text-zinc-500 hover:text-black">How it Works</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium px-4 py-2 hover:bg-zinc-100 rounded-lg transition-colors">Dashboard</Link>
            <Button variant="primary">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/supercar/1920/1080?blur=2" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge variant="outline" className="text-white border-white/20 mb-6 px-4 py-1.5 backdrop-blur-md bg-white/5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              12 NEW AUCTIONS TODAY
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              OWN THE <br /> <span className="text-zinc-500">EXTRAORDINARY.</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-10 font-medium max-w-lg leading-relaxed">
              The world&apos;s most trusted marketplace for buying and selling exceptional vehicles. 
              Real-time bidding, expert curation, and secure transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20">
                Browse Auctions
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-widest text-white border-white/20 hover:bg-white/10 backdrop-blur-md">
                Sell Your Car
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input 
                  placeholder="Search make, model, year..." 
                  className="pl-11 h-12 rounded-xl border-zinc-200 focus:border-black transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 rounded-xl gap-2 border-zinc-200">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Porsche', 'Toyota', 'Ford', 'BMW', 'Mercedes', 'Ferrari'].map(brand => (
                <button
                  key={brand}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 text-xs font-black uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all whitespace-nowrap"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuctions.map((vehicle) => (
              <AuctionCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          
          {filteredAuctions.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-zinc-400 text-lg">No auctions found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-black tracking-tighter mb-6">VELOAUCTION</h2>
            <p className="text-zinc-400 max-w-sm mb-8">
              The premier marketplace for buying and selling exceptional vehicles. 
              Real-time bidding, verified sellers, and secure transactions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/">Live Auctions</Link></li>
              <li><Link href="/">Past Results</Link></li>
              <li><Link href="/">Sell a Car</Link></li>
              <li><Link href="/">Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/">About Us</Link></li>
              <li><Link href="/">Careers</Link></li>
              <li><Link href="/">Press</Link></li>
              <li><Link href="/">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
