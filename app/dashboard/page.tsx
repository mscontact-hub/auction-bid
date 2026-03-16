'use client';

import { UserDashboardSidebar } from '@/components/dashboard/Sidebar';
import { Card, Badge } from '@/components/ui/base';
import { useUserStore } from '@/store/useUserStore';
import { Gavel, Trophy, Heart, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/lib/utils';

const CHART_DATA = [
  { name: 'Mon', bids: 4 },
  { name: 'Tue', bids: 7 },
  { name: 'Wed', bids: 5 },
  { name: 'Thu', bids: 12 },
  { name: 'Fri', bids: 8 },
  { name: 'Sat', bids: 15 },
  { name: 'Sun', bids: 10 },
];

export default function DashboardPage() {
  const { user } = useUserStore();

  const stats = [
    { label: 'Active Bids', value: '3', icon: Gavel, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2 this week' },
    { label: 'Auctions Won', value: '1', icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Last won 2d ago' },
    { label: 'Watching', value: '12', icon: Heart, color: 'text-red-600', bg: 'bg-red-50', trend: '3 ending soon' },
    { label: 'Total Bids', value: '45', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50', trend: 'Top 5% of bidders' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 border-b border-zinc-100 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter">DASHBOARD</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black">{user?.name}</p>
              <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Verified Member</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 overflow-hidden shadow-sm">
              <img src={user?.avatar} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <UserDashboardSidebar />
        
        <main className="flex-grow space-y-12">
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">Overview</h2>
                <p className="text-zinc-500 font-medium">Welcome back, {user?.name.split(' ')[0]}. Here&apos;s your activity.</p>
              </div>
              <Badge variant="success" className="h-8 px-4 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Activity Up 12%
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 border-none bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black mt-1 tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-bold text-zinc-400 mt-4 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                    {stat.trend}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <section className="xl:col-span-2">
              <h2 className="text-2xl font-black tracking-tight mb-8">Bidding Activity</h2>
              <Card className="p-8 h-[400px] border-zinc-100">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#a1a1aa' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#a1a1aa' }} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="bids" 
                      stroke="#000" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorBids)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black tracking-tight">Recent Activity</h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-4 flex items-center gap-4 hover:bg-zinc-50 transition-all border-zinc-100 cursor-pointer group">
                    <div className="w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden relative shrink-0">
                      <img src={`https://picsum.photos/seed/car${i}/100/100`} alt="Recent Activity" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-black text-sm truncate">199{i} Porsche 911 Carrera</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Outbid by $500 • 2h ago</p>
                    </div>
                    <Badge variant="danger" className="shrink-0">Outbid</Badge>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
