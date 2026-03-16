'use client';

import { Card, Input, Button } from '@/components/ui/base';
import { Search, MapPin, DollarSign, Calendar } from 'lucide-react';

export function AuctionFilters() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input placeholder="Search cars..." className="pl-10" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Make</h3>
        <div className="space-y-2">
          {['Porsche', 'BMW', 'Toyota', 'Ford', 'Mercedes'].map((make) => (
            <label key={make} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-zinc-200 group-hover:border-black transition-colors flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-black">{make}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Min" type="number" />
          <Input placeholder="Max" type="number" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Year</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="From" type="number" />
          <Input placeholder="To" type="number" />
        </div>
      </div>

      <Button variant="outline" className="w-full">Reset Filters</Button>
    </div>
  );
}
