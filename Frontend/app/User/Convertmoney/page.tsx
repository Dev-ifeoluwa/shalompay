"use client"

import FeatureCard from 'components/ConverterCom/ConvertFeature';
import HistoryTab from 'components/ConverterCom/ConvertHistory';
import ConverterTab from 'components/ConverterCom/ConvertTabCom';
import ExchangeRatesTab from 'components/ConverterCom/ExchangeRateCom';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { convertCurrencyApi } from 'service/currencyService';

// Types
interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1.00');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'converter' | 'rates' | 'history'>('converter');
  const router = useRouter()


  const HandleClick = () => {
     router.push("/UserDashboard")
  }

  // Mock currency data
  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'NGN', name: 'Nigeria Naira', symbol: '₦' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    // { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    // { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    // { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    // { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    // { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  ];

  // Simulate API call for conversion
  const convertCurrency = async () => {
    if(!amount) return

    setIsLoading(true);


    try {

      await new Promise(resolve => setTimeout(resolve, 500));
      const numericAmount = parseFloat(amount) || 0;

      const { rate, convertedAmount } = await convertCurrencyApi(
        fromCurrency,
        toCurrency,
        numericAmount
      );

      setConvertedAmount(convertedAmount.toFixed(4));
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleTimeString());

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error converting currency. Please try again.");
    }

    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 500));

    // const numericAmount = parseFloat(amount) || 0;
    // const rate = exchangeRates.find(
    //   rate => rate.from === fromCurrency && rate.to === toCurrency
    // )?.rate || 1;

    // const converted = numericAmount * rate;
    // setConvertedAmount(converted.toFixed(4));
    // setExchangeRate(rate);
    // setLastUpdated(new Date().toLocaleTimeString());

    // setIsLoading(false);
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Initialize conversion on mount
  useEffect(() => {
    convertCurrency();
  }, []);

  // Convert when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);




  return (
    <div className="min-h-screen text-sm md:text-md mb-15 pt-8 md:pt-5 py-8">
      <span className="flex justify-between px-2 mb-15 items-center">
        <p className="flex items-center gap-3">
          <ArrowLeft
            onClick={HandleClick}
            className="cursor-pointer"
            size={20} />
          <p className="font-semibold">Currency Converter</p>
        </p>
        <p className="cursor-pointer font-semibold">History</p>
      </span>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-green-700 text-md md:text-lg">
            Real-time exchange rates and currency conversion
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-green-100">
            <nav className="flex">
              {[
                { id: 'converter', name: 'Converter' },
                { id: 'rates', name: 'Exchange Rates' },
                { id: 'history', name: 'History' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-6 text-center font-semibold transition-all ${activeTab === tab.id
                      ? 'bg-green-500 text-white'
                      : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'converter' && (
              <ConverterTab
                amount={amount}
                setAmount={setAmount}
                fromCurrency={fromCurrency}
                setFromCurrency={setFromCurrency}
                toCurrency={toCurrency}
                setToCurrency={setToCurrency}
                convertedAmount={convertedAmount}
                exchangeRate={exchangeRate}
                isLoading={isLoading}
                lastUpdated={lastUpdated}
                // currencies={[]}
                currencies={currencies}
                onSwap={swapCurrencies}
              />
            )}

            {activeTab === 'rates' && (
              <ExchangeRatesTab
                // currencies={[]}
                currencies={currencies}
                exchangeRates={[]}
              />
            )}

            {activeTab === 'history' && (
              <HistoryTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;