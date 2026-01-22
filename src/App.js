import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Bitcoin, 
  Activity, 
  DollarSign, 
  Menu, 
  Bell, 
  Search,
  Zap
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const mockStockData = [
  { name: 'S&P 500', symbol: 'SPX', price: 4783.45, change: 1.2, data: [4700, 4720, 4710, 4750, 4783] },
  { name: 'Nasdaq', symbol: 'NDX', price: 16832.92, change: -0.5, data: [16900, 16850, 16880, 16800, 16832] },
  { name: 'Dow Jones', symbol: 'DJI', price: 37468.61, change: 0.8, data: [37200, 37300, 37250, 37400, 37468] },
];

const mockCryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 64230.50, change: 4.5, data: [61000, 62500, 61800, 63500, 64230] },
  { name: 'Ethereum', symbol: 'ETH', price: 3450.12, change: 2.1, data: [3300, 3350, 3320, 3400, 3450] },
];

const opportunities = [
  { title: "AI Tech Sector", risk: "High", potential: "+15%", tag: "Growth" },
  { title: "Green Energy ETF", risk: "Med", potential: "+8%", tag: "Stable" },
  { title: "BTC Halving Event", risk: "High", potential: "+40%", tag: "Crypto" },
];

const MiniChart = ({ data, color }) => (
  <div className="h-16 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((val, i) => ({ i, val }))}>
        <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AssetCard = ({ asset, type }) => {
  const isUp = asset.change >= 0;
  const color = isUp ? '#10B981' : '#EF4444'; 

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${type === 'crypto' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {type === 'crypto' ? <Bitcoin size={20} /> : <Activity size={20} />}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{asset.symbol}</h3>
            <p className="text-gray-400 text-xs">{asset.name}</p>
          </div>
        </div>
        <MiniChart data={asset.data} color={color} />
      </div>
      
      <div className="mt-4 flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold text-white">${asset.price.toLocaleString()}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(asset.change)}%
        </div>
      </div>
    </div>
  );
};

const OpportunityCard = ({ item }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border-l-4 border-purple-500 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
      <Zap size={40} className="text-purple-500" />
    </div>
    <div className="flex justify-between mb-2">
      <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">{item.tag}</span>
      <span className="text-gray-400 text-xs">Risk: {item.risk}</span>
    </div>
    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
    <p className="text-green-400 font-mono">Proj. Return: {item.potential}</p>
    <button className="w-full mt-3 bg-gray-700 hover:bg-purple-600 text-white py-2 rounded-lg text-sm transition-colors">
      Analyze Opportunity
    </button>
  </div>
);

export default function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-20 md:pb-0">
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <DollarSign className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            InvestFlow
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Search className="text-gray-400 cursor-pointer hover:text-white" size={20} />
          <Bell className="text-gray-400 cursor-pointer hover:text-white" size={20} />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
        </div>
      </header>

      <div className="mt-16 bg-black py-2 overflow-hidden whitespace-nowrap border-b border-gray-800">
        <div className="inline-block animate-marquee pl-4">
          <span className="mx-4 text-green-400">BTC $64,230 ▲ 4.5%</span>
          <span className="mx-4 text-green-400">SPX $4,783 ▲ 1.2%</span>
          <span className="mx-4 text-red-400">NDX $16,832 ▼ 0.5%</span>
          <span className="mx-4 text-green-400">ETH $3,450 ▲ 2.1%</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Total Market Cap</h1>
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                $2.45 Trillion
              </p>
              <p className="text-green-400 mt-2 flex items-center gap-2">
                <TrendingUp size={16} /> Global Market is up 2.4% today
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 flex flex-col justify-between">
              <div>
                <h3 className="text-gray-400">Fear & Greed Index</h3>
                <span className="text-3xl font-bold text-green-500">74</span>
                <span className="text-sm text-green-400 ml-2">Greed</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-green-500 h-full w-3/4"></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-blue-500" /> US Indices
            </h2>
            <button className="text-blue-400 text-sm hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockStockData.map((stock) => (
              <AssetCard key={stock.symbol} asset={stock} type="stock" />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bitcoin className="text-orange-500" /> Crypto Assets
            </h2>
            <button className="text-orange-400 text-sm hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCryptoData.map((crypto) => (
              <AssetCard key={crypto.symbol} asset={crypto} type="crypto" />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             <Zap className="text-purple-500" /> Smart Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((item, index) => (
              <OpportunityCard key={index} item={item} />
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 p-4 md:hidden z-50">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-blue-500">
            <Activity size={24} />
            <span className="text-[10px] mt-1">Markets</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-white">
            <Search size={24} />
            <span className="text-[10px] mt-1">Explore</span>
          </button>
          <div className="relative -top-6 bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/40 border-4 border-gray-900">
            <DollarSign className="text-white" size={24} />
          </div>
          <button className="flex flex-col items-center text-gray-500 hover:text-white">
            <TrendingUp size={24} />
            <span className="text-[10px] mt-1">Portfolio</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-white">
            <Menu size={24} />
            <span className="text-[10px] mt-1">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
