'use client';

import { UserDashboardSidebar } from '@/components/dashboard/Sidebar';
import { Card, Badge, Button } from '@/components/ui/base';
import { useAuctionStore } from '@/store/useAuctionStore';
import { Trophy, ArrowRight, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WonAuctionsPage() {
  // Mocking won auctions
  const wonAuctions = [
    {
      id: '3',
      year: 2021,
      make: 'Porsche',
      model: 'Taycan Turbo S',
      amount: 145000,
      wonDate: '2024-03-10',
      image: 'https://picsum.photos/seed/taycan/400/300',
      slug: '2021-porsche-taycan-turbo-s',
      status: 'Paid'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter">WON AUCTIONS</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-12">
        <UserDashboardSidebar />
        
        <main className="flex-grow">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-500" />
              Your Collection
            </h2>
            <p className="text-zinc-500">View and manage the vehicles you&apos;ve successfully won.</p>
          </div>

          <div className="space-y-6">
            {wonAuctions.map((auction) => (
              <Card key={auction.id} className="p-8 border-zinc-100 hover:shadow-xl transition-all group">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-64 aspect-[4/3] bg-zinc-100 rounded-2xl overflow-hidden relative shrink-0">
                    <img src={auction.image} alt={auction.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="success" className="shadow-lg">Won</Badge>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-black tracking-tight mb-1">
                            {auction.year} {auction.make} {auction.model}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              Won on {new Date(auction.wonDate).toLocaleDateString()}
                            </div>
                            <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              {auction.status}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Winning Bid</p>
                          <p className="text-2xl font-mono font-black tracking-tighter">${auction.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mb-6">
                        <p className="text-xs font-bold text-zinc-500 mb-2">Next Steps</p>
                        <ul className="space-y-2">
                          <li className="text-xs flex items-center gap-2 text-zinc-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Payment received and verified
                          </li>
                          <li className="text-xs flex items-center gap-2 text-zinc-600">
                            <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                            Coordinate shipping with the seller
                          </li>
                          <li className="text-xs flex items-center gap-2 text-zinc-600">
                            <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                            Transfer of title and registration
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 h-12 rounded-xl gap-2">
                        Contact Seller
                      </Button>
                      <Button variant="outline" className="flex-1 h-12 rounded-xl gap-2">
                        View Paperwork
                      </Button>
                      <Link href={`/auctions/${auction.slug}`}>
                        <Button variant="ghost" className="h-12 w-12 rounded-xl p-0">
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {wonAuctions.length === 0 && (
              <div className="py-32 text-center border-2 border-dashed border-zinc-100 rounded-[40px]">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-zinc-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">No auctions won yet</h3>
                <p className="text-zinc-500 mb-8">Your winning bids will appear here.</p>
                <Link href="/">
                  <Button className="h-12 px-8 rounded-xl">Browse Auctions</Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
