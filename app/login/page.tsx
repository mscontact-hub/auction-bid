'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input } from '@/components/ui/base';
import { Chrome, Facebook, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-black tracking-tighter">VELO<span className="text-zinc-400">AUCTION</span></Link>
          <p className="text-zinc-500 mt-2 font-medium">Welcome back. Please sign in to continue.</p>
        </div>

        <Card className="p-8 shadow-xl border-none">
          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 gap-3 font-bold">
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-12 gap-3 font-bold bg-[#1877F2] text-white border-none hover:bg-[#166fe5]">
              <Facebook className="w-5 h-5 fill-current" />
              Continue with Facebook
            </Button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">or sign in with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <Button className="w-full h-12 gap-2 text-base">
              Continue with Email
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-400">
            Don&apos;t have an account? <Link href="/register" className="text-black font-bold hover:underline">Create one</Link>
          </p>
        </Card>

        <div className="mt-8 text-center space-x-4">
          <Link href="/terms" className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest hover:text-black">Terms</Link>
          <Link href="/privacy" className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest hover:text-black">Privacy</Link>
          <Link href="/help" className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest hover:text-black">Help</Link>
        </div>
      </div>
    </div>
  );
}
