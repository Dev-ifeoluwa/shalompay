interface Currency {
  code: string;
  name: string;
  symbol: string;
  // flag?: string; // Optional flag emoji
}

interface ConverterTabProps {
  amount: string;
  setAmount: (amount: string) => void;
  fromCurrency: string;
  setFromCurrency: (currency: string) => void;
  toCurrency: string;
  setToCurrency: (currency: string) => void;
  convertedAmount: string;
  exchangeRate: number;
  isLoading: boolean;
  lastUpdated: string;
  currencies: Currency[];
  onSwap: () => void;
}

const ConverterTab: React.FC<ConverterTabProps> = ({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  convertedAmount,
  exchangeRate,
  isLoading,
  lastUpdated,
  currencies,
  onSwap,
}) => {
  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '';
  };

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  return (
    <div className="space-y-6">
      {/* Conversion Card */}
      <div className="bg-green-600 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-1 gap-5 items-center">
          {/* From Currency */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold opacity-90">
              From
            </label>
            <div className="flex space-x-3">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="flex-1 bg-white text-green-900 rounded-lg px-3 py-3 font-semibold border-0 focus:ring-2 focus:ring-green-300"
              >
                {/* {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))} */}


                {currencies.map((currency, index) => (
                    <option key={`${currency.code}-${index}`} value={currency.code}>
                     {currency.code} - {currency.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white text-green-900 rounded-lg px-4 py-4 text-xl font-bold border-0 focus:ring-2 focus:ring-green-300"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 font-semibold">
                {getCurrencySymbol(fromCurrency)}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={onSwap}
              className="w-12 h-12 bg-white text-green-600 rounded-full flex items-center justify-center hover:bg-green-50 transition-all transform hover:rotate-180 duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold opacity-90">
              To
            </label>
            <div className="flex space-x-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 bg-white text-green-900 rounded-lg px-3 py-3 font-semibold border-0 focus:ring-2 focus:ring-green-300"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                value={isLoading ? 'Converting...' : convertedAmount}
                readOnly
                className="w-full bg-white text-green-900 rounded-lg px-4 py-4 text-xl font-bold border-0 focus:ring-2 focus:ring-green-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 font-semibold">
                {getCurrencySymbol(toCurrency)}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-6 pt-6 border-t border-green-300 border-opacity-30">
          <div className="flex justify-between items-center text-sm">
            <div className="opacity-90">
              Exchange Rate: <strong>1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}</strong>
            </div>
            {/* <div className="opacity-75">
              Last updated: {lastUpdated}
            </div> */}
          </div>
        </div>
      </div>

      {/* Quick Select Buttons */}
      {/* <div className="bg-white rounded-xl p-4 border border-green-200">
        <h3 className="text-green-800 font-semibold mb-3">Popular Amounts</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 10, 50, 100, 500, 1000].map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value.toString())}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              {getCurrencySymbol(fromCurrency)}{value}
            </button>
          ))}
        </div>
      </div> */}

      {/* Popular Currencies */}
      {/* <div className="bg-white rounded-xl p-4 border border-green-200">
        <h3 className="text-green-800 font-semibold mb-3">Popular Currencies</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {popularCurrencies.map((currency) => (
            <button
              key={currency}
              onClick={() => setToCurrency(currency)}
              className={`p-3 rounded-lg border transition-all ${
                toCurrency === currency
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
              }`}
            >
              <div className="font-bold">{currency}</div>
              <div className="text-xs opacity-75">
                {currencies.find(c => c.code === currency)?.name}
              </div>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ConverterTab