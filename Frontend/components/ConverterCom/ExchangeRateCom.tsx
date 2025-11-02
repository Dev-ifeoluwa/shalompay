"use client"

import { useState } from "react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string; // Optional flag emoji
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
  change?: number; // Percentage change
  trend?: 'up' | 'down' | 'stable';
}

interface ExchangeRatesTabProps {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
}

const ExchangeRatesTab: React.FC<ExchangeRatesTabProps> = ({ currencies, exchangeRates }) => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRates = exchangeRates
    .filter(rate => rate.from === baseCurrency)
    .filter(rate => 
      rate.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currencies.find(c => c.code === rate.to)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-green-900">Live Exchange Rates</h3>
          <p className="text-green-600">Real-time rates for {baseCurrency}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-300"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-green-200 text-green-800 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-green-300 focus:border-green-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRates.map((rate) => {
          const currency = currencies.find(c => c.code === rate.to);
          const isPositive = rate.rate > 1;
          
          return (
            <div
              key={`${rate.from}-${rate.to}`}
              className="bg-white border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-r from-green-400 to-lime-400 rounded-full flex items-center justify-center text-white font-bold">
                    {currency?.symbol || rate.to.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-green-900">{rate.to}</div>
                    <div className="text-sm text-green-600">{currency?.name}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  isPositive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-lime-100 text-lime-700'
                }`}>
                  {isPositive ? '↑' : '↓'}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-600 text-sm">Rate:</span>
                  <span className="font-bold text-green-900">{rate.rate.toFixed(6)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 text-sm">Last Updated:</span>
                  <span className="text-green-700 text-sm">
                    {new Date(rate.lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-green-400 text-6xl mb-4">💱</div>
          <div className="text-green-600 font-semibold">No rates found</div>
          <div className="text-green-500 text-sm mt-1">Try changing your search terms</div>
        </div>
      )}
    </div>
  );
};

export default ExchangeRatesTab