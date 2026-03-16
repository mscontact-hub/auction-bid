'use client';

import { UserDashboardSidebar } from '@/components/dashboard/Sidebar';
import { Card, Button, Input } from '@/components/ui/base';
import { CreditCard, Plus, Trash2, ShieldCheck, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState([
    { id: '1', brand: 'Visa', last4: '4242', exp: '12/26', isDefault: true },
    { id: '2', brand: 'Mastercard', last4: '8888', exp: '08/25', isDefault: false },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter">PAYMENT METHODS</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-12">
        <UserDashboardSidebar />
        
        <main className="flex-grow max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Saved Cards</h2>
              <p className="text-zinc-500">Manage your payment methods for bidding and purchases.</p>
            </div>
            <Button className="rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Add New Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {methods.map((method) => (
              <Card key={method.id} className="p-6 border-zinc-100 hover:shadow-xl transition-all relative group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-8 bg-zinc-100 rounded flex items-center justify-center font-bold text-[10px] uppercase">
                    {method.brand}
                  </div>
                  {method.isDefault && (
                    <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">
                      Default
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <p className="text-xl font-mono font-bold tracking-widest">•••• •••• •••• {method.last4}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Expires</p>
                      <p className="text-sm font-bold">{method.exp}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <section className="space-y-6">
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Secure Payments</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We use industry-standard encryption to protect your payment information. 
                  Your full card details are never stored on our servers.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Lock className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Bidding Requirements</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  A valid credit card is required to place bids. A temporary hold may be placed 
                  on your card when you place a bid to verify funds.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
