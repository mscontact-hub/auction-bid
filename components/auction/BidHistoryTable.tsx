'use client';

import { Bid } from '@/store/useAuctionStore';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export function BidHistoryTable({ bids }: { bids: Bid[] }) {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase font-bold text-zinc-400 border-b border-zinc-100">
          <tr>
            <th className="py-4 px-2">Bidder</th>
            <th className="py-4 px-2">Amount</th>
            <th className="py-4 px-2 text-right">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          <AnimatePresence initial={false}>
            {bids.map((bid, idx) => (
              <motion.tr
                key={bid.id}
                initial={{ opacity: 0, x: -20, backgroundColor: idx === 0 ? '#f0fdf4' : 'transparent' }}
                animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                exit={{ opacity: 0 }}
                className="group hover:bg-zinc-50 transition-colors"
              >
                <td className="py-4 px-2 font-medium">
                  {bid.bidderName.substring(0, 3)}***{bid.bidderName.slice(-1)}
                  {idx === 0 && (
                    <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase">
                      Highest
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 font-mono font-bold">
                  ${bid.amount.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-right text-zinc-400">
                  {formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true })}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {bids.length === 0 && (
        <div className="py-12 text-center text-zinc-400">
          No bids yet. Be the first to bid!
        </div>
      )}
    </div>
  );
}
