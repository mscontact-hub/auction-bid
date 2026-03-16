'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Chrome, Facebook, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui/base';
import { motion } from 'motion/react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-zinc-100">
        {/* Left Side - Info */}
        <div className="bg-black p-12 text-white flex flex-col justify-between">
          <div>
            <Link href="/" className="text-3xl font-black tracking-tighter mb-12 block">VELO<span className="text-zinc-500">AUCTION</span></Link>
            <h2 className="text-4xl font-black tracking-tight mb-6 leading-tight">Join the premier <br /> auction community.</h2>
            <p className="text-zinc-400 text-lg mb-12">Get access to exclusive vehicles, real-time bidding, and expert insights.</p>
            
            <div className="space-y-6">
              {[
                'Real-time bidding alerts',
                'Verified seller network',
                'Secure payment processing',
                'Expert vehicle inspections',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <ShieldCheck className="w-6 h-6 text-zinc-500" />
            <p className="text-xs text-zinc-500">Your data is encrypted and secure. We never share your information.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-12">
          <div className="mb-10">
            <h1 className="text-2xl font-black tracking-tight mb-2">Create Account</h1>
            <p className="text-zinc-500 font-medium">Start your journey today.</p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-14 gap-3 font-bold rounded-2xl">
              <Chrome className="w-5 h-5" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full h-14 gap-3 font-bold bg-[#1877F2] text-white border-none hover:bg-[#166fe5] rounded-2xl">
              <Facebook className="w-5 h-5 fill-current" />
              Sign up with Facebook
            </Button>
          </div>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-black tracking-widest">or use email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">First Name</label>
                <Input placeholder="John" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Last Name</label>
                <Input placeholder="Doe" className="h-12 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl"
              />
            </div>
            <Button className="w-full h-14 gap-2 text-base rounded-2xl shadow-xl shadow-black/10">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Already have an account? <Link href="/login" className="text-black font-black hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
