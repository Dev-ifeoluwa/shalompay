"use client"

import { ArrowLeft, Search, ChevronLeft, ImagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Brand = {
    id: string;
    name: string;
    initials: string;
    sellRate: number; // NGN per $1
    buyRate: number;  // NGN per $1
};

const BRANDS: Brand[] = [
    { id: "amazon", name: "Amazon", initials: "AZ", sellRate: 850, buyRate: 950 },
    { id: "itunes", name: "iTunes", initials: "IT", sellRate: 780, buyRate: 880 },
    { id: "steam", name: "Steam", initials: "ST", sellRate: 800, buyRate: 900 },
    { id: "googleplay", name: "Google Play", initials: "GP", sellRate: 790, buyRate: 890 },
    { id: "ebay", name: "eBay", initials: "EB", sellRate: 820, buyRate: 920 },
    { id: "visa", name: "Visa", initials: "VS", sellRate: 830, buyRate: 930 },
    { id: "walmart", name: "Walmart", initials: "WM", sellRate: 800, buyRate: 900 },
    { id: "nike", name: "Nike", initials: "NK", sellRate: 770, buyRate: 870 },
];

const CARD_TYPES = ["Physical card", "E-code"];

export default function GiftCardPage() {
    const router = useRouter();
    const HandleClick = () => router.push("/UserDashboard");

    const [mode, setMode] = useState<"sell" | "buy">("sell");
    const [query, setQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    // sell form
    const [cardType, setCardType] = useState(CARD_TYPES[0]);
    const [cardValue, setCardValue] = useState("");
    const [cardCode, setCardCode] = useState("");

    // buy form
    const [buyAmount, setBuyAmount] = useState("");
    const [deliveryEmail, setDeliveryEmail] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [pin, setPin] = useState(["", "", "", ""]);

    const filteredBrands = BRANDS.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    const rate = selectedBrand
        ? mode === "sell"
            ? selectedBrand.sellRate
            : selectedBrand.buyRate
        : 0;

    const sellPayout = (Number(cardValue) || 0) * rate;
    const buyUsdValue = rate ? (Number(buyAmount) || 0) / rate : 0;

    const handleBrandSelect = (brand: Brand) => {
        setSelectedBrand(brand);
        setCardValue("");
        setCardCode("");
        setBuyAmount("");
        setDeliveryEmail("");
    };

    const handleBack = () => {
        if (selectedBrand) {
            setSelectedBrand(null);
        } else {
            HandleClick();
        }
    };

    const handleSubmit = () => {
        if (!selectedBrand) return;

        if (mode === "sell") {
            if (!cardValue || Number(cardValue) <= 0) {
                toast.error("Enter the card value");
                return;
            }
            if (!cardCode) {
                toast.error("Enter the card code or upload an image");
                return;
            }
        } else {
            if (!buyAmount || Number(buyAmount) <= 0) {
                toast.error("Enter an amount to spend");
                return;
            }
            if (!deliveryEmail) {
                toast.error("Enter a delivery email");
                return;
            }
        }

        setShowPopup(true);
    };

    const handleProcess = () => {
        setShowPopup(false);
        setShowPin(true);
    };

    const handleProcessSubmit = () => {
        const payload =
            mode === "sell"
                ? {
                      mode,
                      brand: selectedBrand?.name,
                      cardType,
                      cardValue,
                      cardCode,
                      payout: sellPayout,
                  }
                : {
                      mode,
                      brand: selectedBrand?.name,
                      amount: buyAmount,
                      deliveryEmail,
                      usdValue: buyUsdValue,
                  };
        console.log("sending to backend:", payload);
    };

    const handlePinChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (value && index < 3) document.getElementById(`pin-${index + 1}`)?.focus();
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1a0f0a_0%,#0e0704_40%,#0a0503_100%)]">
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#ff7a3d]/25 blur-2xl" />

            <div className="z-10 mb-10 mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 pb-24 flex flex-col gap-5 text-sm">

                {/* Top bar */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#d8c3b6] hover:text-white transition"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <p className="font-semibold text-[#fbf3ec] text-base italic font-serif">
                            {selectedBrand ? selectedBrand.name : "Gift cards"}
                        </p>
                    </div>
                    <p className="cursor-pointer font-semibold text-sm text-[#ff7a3d]">History</p>
                </div>

                {!selectedBrand ? (
                    <>
                        {/* Buy / Sell toggle */}
                        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/[0.08] rounded-full p-1 w-fit">
                            <button
                                onClick={() => setMode("sell")}
                                className={`text-sm font-bold px-6 py-2 rounded-full transition ${
                                    mode === "sell" ? "bg-[#ff7a3d] text-[#1a0d05]" : "text-[#8f7768]"
                                }`}
                            >
                                Sell
                            </button>
                            <button
                                onClick={() => setMode("buy")}
                                className={`text-sm font-bold px-6 py-2 rounded-full transition ${
                                    mode === "buy" ? "bg-[#ff7a3d] text-[#1a0d05]" : "text-[#8f7768]"
                                }`}
                            >
                                Buy
                            </button>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#26140c] px-4 py-3">
                            <Search size={16} className="text-[#8f7768]" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search gift card brand"
                                className="w-full bg-transparent text-sm text-[#fbf3ec] outline-none placeholder:text-[#8f7768]"
                            />
                        </div>

                        {/* Brand grid */}
                        <p className="text-xs font-bold text-[#8f7768] px-1">
                            {mode === "sell" ? "Select a brand to sell" : "Select a brand to buy"}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {filteredBrands.map((brand) => (
                                <button
                                    key={brand.id}
                                    onClick={() => handleBrandSelect(brand)}
                                    className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-5 text-left"
                                >
                                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#ff7a3d]/15 text-[#ff7a3d] font-bold text-sm font-serif">
                                        {brand.initials}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-[#fbf3ec]">{brand.name}</p>
                                        <p className="text-[11px] text-[#8f7768] mt-0.5">
                                            ₦{mode === "sell" ? brand.sellRate : brand.buyRate}/$1
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filteredBrands.length === 0 && (
                            <p className="text-sm text-[#8f7768] text-center py-10">
                                No gift card brands match "{query}".
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        {/* Rate banner */}
                        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-3">
                            <span className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#ff7a3d]/15 text-[#ff7a3d] font-bold text-sm font-serif">
                                    {selectedBrand.initials}
                                </span>
                                <span className="text-sm font-semibold text-[#fbf3ec]">
                                    {mode === "sell" ? "Selling" : "Buying"} {selectedBrand.name}
                                </span>
                            </span>
                            <span className="text-xs font-bold text-[#f4b860]">₦{rate}/$1</span>
                        </div>

                        {mode === "sell" ? (
                            <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                                {/* Card type */}
                                <div>
                                    <p className="text-xs font-semibold text-[#8f7768] mb-2">Card type</p>
                                    <div className="flex gap-2">
                                        {CARD_TYPES.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setCardType(type)}
                                                className={`text-xs font-bold px-4 py-2 rounded-full border transition ${
                                                    cardType === type
                                                        ? "bg-[#ff7a3d] text-[#1a0d05] border-[#ff7a3d]"
                                                        : "bg-white/[0.05] text-[#d8c3b6] border-white/[0.08]"
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Card value */}
                                <div>
                                    <p className="text-xs font-semibold text-[#8f7768] mb-2">Card value ($)</p>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        value={cardValue}
                                        onChange={(e) => setCardValue(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-[#fbf3ec] outline-none placeholder:text-[#8f7768]"
                                    />
                                </div>

                                {/* Card code / upload */}
                                <div>
                                    <p className="text-xs font-semibold text-[#8f7768] mb-2">Card code</p>
                                    <input
                                        value={cardCode}
                                        onChange={(e) => setCardCode(e.target.value)}
                                        placeholder="Enter code printed on card"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-[#fbf3ec] outline-none placeholder:text-[#8f7768] mb-2"
                                    />
                                    <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.15] py-4 text-xs font-semibold text-[#8f7768]">
                                        <ImagePlus size={15} />
                                        Or upload a photo of the card
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                                    <span className="text-xs text-[#8f7768]">You'll receive</span>
                                    <span className="font-serif text-xl font-semibold text-[#f4b860]">
                                        ₦{sellPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                                {/* Amount to spend */}
                                <div>
                                    <p className="text-xs font-semibold text-[#8f7768] mb-2">Amount to spend (₦)</p>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        value={buyAmount}
                                        onChange={(e) => setBuyAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-[#fbf3ec] outline-none placeholder:text-[#8f7768]"
                                    />
                                </div>

                                {/* Delivery email */}
                                <div>
                                    <p className="text-xs font-semibold text-[#8f7768] mb-2">Delivery email</p>
                                    <input
                                        type="email"
                                        value={deliveryEmail}
                                        onChange={(e) => setDeliveryEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-[#fbf3ec] outline-none placeholder:text-[#8f7768]"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                                    <span className="text-xs text-[#8f7768]">Card value</span>
                                    <span className="font-serif text-xl font-semibold text-[#f4b860]">
                                        ${buyUsdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-sm text-[#1a0d05] bg-gradient-to-br from-[#ff7a3d] to-[#c1440e] shadow-lg shadow-orange-900/40"
                        >
                            {mode === "sell" ? "Continue to sell" : "Continue to buy"}
                        </button>
                    </>
                )}

                {/* Confirm popup */}
                {showPopup && selectedBrand && (
                    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-[3px]">
                        <div className="bg-[#1e100a] border-t border-white/[0.08] left-0 right-0 p-5 sm:p-6 rounded-t-3xl w-full md:max-w-lg mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-base font-semibold italic font-serif text-[#fbf3ec]">Confirm order</p>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#d8c3b6]"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                                <SummaryRow label="Mode" value={mode === "sell" ? "Sell" : "Buy"} />
                                <SummaryRow label="Brand" value={selectedBrand.name} />
                                {mode === "sell" ? (
                                    <>
                                        <SummaryRow label="Card type" value={cardType} />
                                        <SummaryRow label="Card value" value={`$${cardValue}`} />
                                        <SummaryRow
                                            label="You'll receive"
                                            value={`₦${sellPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                            highlight
                                        />
                                    </>
                                ) : (
                                    <>
                                        <SummaryRow label="Delivery email" value={deliveryEmail} />
                                        <SummaryRow
                                            label="Amount"
                                            value={`₦${Number(buyAmount).toLocaleString()}`}
                                            highlight
                                        />
                                    </>
                                )}
                            </div>
                            <div className="flex mt-5 gap-3 items-center">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="flex-1 py-3 rounded-xl font-bold text-sm text-[#fbf3ec] border border-white/[0.1]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProcess}
                                    className="flex-1 py-3 rounded-xl font-bold text-sm text-[#1a0d05] bg-gradient-to-br from-[#ff7a3d] to-[#c1440e] shadow-lg shadow-orange-900/40"
                                >
                                    Process
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PIN popup */}
                {showPin && (
                    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-[3px]">
                        <div className="bg-[#1e100a] border-t border-white/[0.08] left-0 right-0 p-5 sm:p-6 rounded-t-3xl w-full md:max-w-lg mx-auto">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="text-base font-semibold italic font-serif text-[#fbf3ec]">
                                    Input your PIN to {mode === "sell" ? "confirm" : "pay"}
                                </h1>
                                <h1 className="font-serif text-2xl font-semibold text-[#f4b860]">
                                    {mode === "sell"
                                        ? `₦${sellPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                                        : `₦${Number(buyAmount).toLocaleString()}`}
                                </h1>
                                <div className="flex justify-center gap-3 my-6">
                                    {pin.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`pin-${i}`}
                                            type="password"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handlePinChange(e.target.value, i)}
                                            className="w-11 h-11 text-center text-lg font-semibold rounded-xl bg-white/[0.06] border border-white/[0.1] text-[#fbf3ec] outline-none focus:border-[#ff7a3d]"
                                        />
                                    ))}
                                </div>
                                <button className="font-semibold text-[#ff7a3d] text-xs">
                                    Forgot PIN
                                </button>
                            </div>
                            <div className="flex mt-6 gap-3 items-center">
                                <button
                                    onClick={() => setShowPin(false)}
                                    className="flex-1 py-3 rounded-xl font-bold text-sm text-[#fbf3ec] border border-white/[0.1]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProcessSubmit}
                                    className="flex-1 py-3 rounded-xl font-bold text-sm text-[#1a0d05] bg-gradient-to-br from-[#ff7a3d] to-[#c1440e] shadow-lg shadow-orange-900/40"
                                >
                                    {mode === "sell" ? "Sell now" : "Buy now"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Toaster position="top-center" reverseOrder={true} />
            </div>
        </div>
    )
}

function SummaryRow({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-[#8f7768]">{label}</span>
            <span className={`font-semibold ${highlight ? "text-[#f4b860]" : "text-[#fbf3ec]"}`}>{value}</span>
        </div>
    );
}
