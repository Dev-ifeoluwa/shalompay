"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Preloader from "components/preloader";

const CURRENCIES = [
    { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
    { code: "USD", symbol: "$", label: "US Dollar" },
    { code: "EUR", symbol: "€", label: "Euro" },
    { code: "GBP", symbol: "£", label: "British Pound" },
];

// Placeholder rates against NGN — replace with a live rates endpoint
const RATES_TO_NGN: Record<string, number> = {
    NGN: 1,
    USD: 1650,
    EUR: 1780,
    GBP: 2080,
};

export default function CurrencySwapPage() {
    const router = useRouter();
    const [dashboard, setDashboard] = useState<any>(null);
    const [fromCurrency, setFromCurrency] = useState("NGN");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found, redirecting to signin.");
            router.push('/Account/Signin');
            return;
        }

        const fetchDashboard = async () => {
            const res = await fetch(`${API_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
            })
            if (res.ok) {
                const data = await res.json();
                setDashboard(data.dashboard);
            } else if (res.status === 401) {
                console.error("Unauthorized, redirecting to signin.");
                router.push('/Account/Signin');
            } else {
                console.error("Failed to fetch dashboard data.");
            }
        }
        fetchDashboard();
    }, []);

    const getRate = (from: string, to: string) => {
        return RATES_TO_NGN[from] / RATES_TO_NGN[to];
    };

    const rate = getRate(fromCurrency, toCurrency);
    const numericAmount = Number(amount) || 0;
    const convertedAmount = numericAmount * rate;

    const fromSymbol = CURRENCIES.find((c) => c.code === fromCurrency)?.symbol ?? "";
    const toSymbol = CURRENCIES.find((c) => c.code === toCurrency)?.symbol ?? "";

    const handleSwapDirection = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleConvert = async () => {
        setError("");

        if (!numericAmount || numericAmount <= 0) {
            setError("Enter a valid amount.");
            return;
        }
        if (fromCurrency === toCurrency) {
            setError("Choose two different currencies.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/wallet/convert`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    from: fromCurrency,
                    to: toCurrency,
                    amount: numericAmount,
                }),
            });

            if (res.ok) {
                router.push('/User/Dashboard');
            } else if (res.status === 401) {
                router.push('/Account/Signin');
            } else {
                setError("Could not complete conversion. Try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!dashboard ? (
                <div>
                    <Preloader />
                </div>
            ) : (
                <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1a0f0a_0%,#0e0704_40%,#0a0503_100%)]">
                    <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#ff7a3d]/25 blur-2xl" />

                    <div className="z-10 mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">

                        {/* Top bar */}
                        <div className="flex items-center gap-3 mb-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#d8c3b6] hover:text-white transition"
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <h1 className="text-lg sm:text-xl font-semibold italic font-serif text-[#fbf3ec]">
                                Convert currency
                            </h1>
                        </div>

                        {/* Swap card */}
                        <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#301a10] to-[#26140c] px-5 py-5 sm:px-6">

                            {/* From */}
                            <div>
                                <p className="text-xs font-semibold text-[#8f7768] mb-2">You send</p>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={fromCurrency}
                                        onChange={(e) => setFromCurrency(e.target.value)}
                                        className="appearance-none bg-white/[0.06] border border-white/[0.08] text-sm font-bold text-[#fbf3ec] px-3 py-2.5 rounded-xl outline-none cursor-pointer flex-shrink-0"
                                    >
                                        {CURRENCIES.map((c) => (
                                            <option key={c.code} value={c.code} className="text-black">
                                                {c.symbol} {c.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-transparent text-right font-serif text-2xl sm:text-3xl text-[#fbf3ec] font-semibold tracking-tight outline-none placeholder:text-[#8f7768]/40"
                                    />
                                </div>
                            </div>

                            {/* Swap button */}
                            <div className="flex justify-center my-4">
                                <button
                                    onClick={handleSwapDirection}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff7a3d] text-[#1a0d05] border-4 border-[#1a0f0a] shadow-lg"
                                >
                                    <ArrowUpDown size={16} />
                                </button>
                            </div>

                            {/* To */}
                            <div>
                                <p className="text-xs font-semibold text-[#8f7768] mb-2">You receive</p>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={toCurrency}
                                        onChange={(e) => setToCurrency(e.target.value)}
                                        className="appearance-none bg-white/[0.06] border border-white/[0.08] text-sm font-bold text-[#fbf3ec] px-3 py-2.5 rounded-xl outline-none cursor-pointer flex-shrink-0"
                                    >
                                        {CURRENCIES.map((c) => (
                                            <option key={c.code} value={c.code} className="text-black">
                                                {c.symbol} {c.code}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="w-full text-right font-serif text-2xl sm:text-3xl text-[#f4b860] font-semibold tracking-tight">
                                        {toSymbol}{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rate info */}
                        <div className="flex items-center gap-2 mt-4 px-1">
                            <Info size={13} className="text-[#8f7768] flex-shrink-0" />
                            <p className="text-xs text-[#8f7768]">
                                1 {fromCurrency} = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}
                            </p>
                        </div>

                        {error && (
                            <p className="text-sm text-[#e8563a] mt-4 text-center">{error}</p>
                        )}

                        <button
                            onClick={handleConvert}
                            disabled={loading}
                            className="w-full mt-7 flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-sm text-[#1a0d05] bg-gradient-to-br from-[#ff7a3d] to-[#c1440e] shadow-lg shadow-orange-900/40 disabled:opacity-60"
                        >
                            {loading ? "Converting..." : "Convert now"}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}