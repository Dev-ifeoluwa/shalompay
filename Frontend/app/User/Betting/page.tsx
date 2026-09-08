"use client"

import { ArrowLeft, CircleUser, Dot, Newspaper, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SportBettingTopup() {
    const router = useRouter()
    const [chooseBet, setChooseBet] = useState('')
    const [betId, setBetId] = useState('')
    const [price, setPrice] = useState('')
    const [showPopUp, setShowPopUp] = useState(false)
    const [showPin, setShowPin] = useState(false)
    const [pin, setPin] = useState(["", "", "", ""])

    const handleBetPrice = (value: any) => {
        setPrice(value.toString())
    }

    const handlePurchaseBtn = () => {
        if (!chooseBet || !betId || !price) {
            toast.error('select enter bet provider, bet id and amount')
            return
        }
        setShowPopUp(true)
    }

    const HandleClick = () => {
        router.push("/UserDashboard")
    }

    const BettingPrice = [
        "50",
        "100",
        "200",
        "500",
        "1000",
        "2000",
    ]

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (value && index < 3) document.getElementById(`pin-${index + 1}`)?.focus();
        }
    }

    const handleProcess = () => {
        setShowPin(true)
        setShowPopUp(false)
    }

    const handleProcessSubmit = () => {
        // if(setPin) {
        //     alert("provide your transaction pin!")
        // }
        // else {
            const payload = {
                chooseBet,
                betId,
                price
            }
             console.log('sending to backend:', payload)
        // }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1a0f0a_0%,#0e0704_40%,#0a0503_100%)]">
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#ff7a3d]/25 blur-2xl" />

            <div className="z-10 mx-auto mb-10 w-full px-4 py-6 sm:px-6 sm:py-8 pb-24 flex flex-col gap-5 text-sm">

                {/* Top bar */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={HandleClick}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#d8c3b6] hover:text-white transition"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <p className="font-semibold text-[#fbf3ec] text-base italic font-serif">Betting</p>
                    </div>
                    <p className="cursor-pointer font-semibold text-sm text-[#ff7a3d]">History</p>
                </div>

                {/* Bet provider + user id */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                    <p className="font-semibold text-sm text-[#fbf3ec]">Bet option</p>
                    <select
                        onChange={(e) => setChooseBet(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm font-semibold outline-none text-[#fbf3ec] cursor-pointer"
                    >
                        <option className="text-black" value="">Choose here</option>
                        <option className="text-black" value="Sportybet">Sportybet</option>
                        <option className="text-black" value="BetNaija">BetNaija</option>
                        <option className="text-black" value="BetKing">BetKing</option>
                        <option className="text-black" value="1xbet">1xbet</option>
                    </select>

                    <div>
                        <p className="font-semibold text-sm text-[#d8c3b6] mb-2">User ID</p>
                        <input
                            maxLength={15}
                            onChange={(e) => setBetId(e.target.value.replace(/\D/g, ''))}
                            value={betId}
                            className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] px-3 py-2.5 text-sm font-semibold outline-none text-[#fbf3ec] placeholder:text-[#8f7768]"
                            placeholder="9123756776"
                        />
                    </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-3 py-4 sm:px-4">
                    <p className="text-sm font-semibold text-[#fbf3ec] px-1">Select amount</p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {BettingPrice.map((plan) => (
                            <div
                                key={plan}
                                onClick={() => handleBetPrice(plan)}
                                className={`px-3 py-7 rounded-xl cursor-pointer text-center font-bold transition border ${
                                    price === plan
                                        ? "bg-[#ff7a3d] border-[#ff7a3d] text-[#1a0d05]"
                                        : "bg-[#301a10] border-white/[0.08] text-[#fbf3ec]"
                                }`}
                            >
                                ₦{plan}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#301a10] px-3 py-2.5">
                        <span className="text-base font-semibold text-[#f4b860] flex-shrink-0">₦</span>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            className="w-full bg-transparent text-sm font-semibold outline-none border-0 text-[#fbf3ec] placeholder:text-[#8f7768]"
                            placeholder="50 - 300,000"
                        />
                        <button
                            onClick={handlePurchaseBtn}
                            className="flex-shrink-0 font-bold px-4 py-2 rounded-full text-xs sm:text-sm text-[#1a0d05] bg-gradient-to-r from-[#ff7a3d] to-[#c1440e]"
                        >
                            Purchase
                        </button>
                    </div>
                </div>

                {/* Confirm popup */}
                {showPopUp && (
                    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-[3px]">
                        <div className="bg-[#1e100a] border-t border-white/[0.08] left-0 right-0 p-5 sm:p-6 rounded-t-3xl w-full md:max-w-lg mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-base font-semibold italic font-serif text-[#fbf3ec]">Confirm order</p>
                                <button
                                    onClick={() => setShowPopUp(false)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] text-[#d8c3b6]"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                                <SummaryRow label="Bet provider" value={chooseBet} />
                                <SummaryRow label="Bet ID" value={betId} />
                                <SummaryRow label="Price" value={`₦${price}`} highlight />
                            </div>
                            <div className="flex mt-5 gap-3 items-center">
                                <button
                                    onClick={() => setShowPopUp(false)}
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
                                    Input your PIN to pay
                                </h1>
                                <h1 className="font-serif text-2xl font-semibold text-[#f4b860]">
                                    ₦{price}
                                </h1>
                                <div className="flex justify-center gap-3 my-6">
                                    {pin.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`pin-${i}`}
                                            type="password"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(e.target.value, i)}
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
                                    Buy now
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