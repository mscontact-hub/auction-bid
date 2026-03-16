'use client';

import { UserDashboardSidebar } from '@/components/dashboard/Sidebar';
import { Card, Button, Input } from '@/components/ui/base';
import { useUserStore } from '@/store/useUserStore';
import { Camera, ShieldCheck, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter">PROFILE SETTINGS</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-12">
        <UserDashboardSidebar />
        
        <main className="flex-grow max-w-2xl">
          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-8">Personal Information</h2>
            
            <div className="flex items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-zinc-100 border-4 border-white shadow-lg overflow-hidden">
                  <img src={user?.avatar} alt="Profile Picture" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold">{user?.name}</h3>
                <p className="text-sm text-zinc-500">Member since March 2024</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="success">Verified Account</Badge>
                </div>
              </div>
            </div>

            <Card className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6">Security & Privacy</h2>
            <Card className="divide-y divide-zinc-100">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-bold">Two-Factor Authentication</p>
                  <p className="text-xs text-zinc-500">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-bold">Change Password</p>
                  <p className="text-xs text-zinc-500">Last changed 3 months ago.</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

import { Badge } from '@/components/ui/base';
