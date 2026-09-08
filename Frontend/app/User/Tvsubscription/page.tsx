"use client"

import { ArrowLeft, CircleUser, Newspaper, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type tvPlan = {
    id: number;
    Name: string,
    Plan: string,
    Price: string
}

type tvPlans = {
    Name: string;
    Plan: string;
    Price: string;
}

export default function TvSubsPage() {
    const [tvNetwork, setTvNetwork] = useState('')
    const [smartCardNumber, setSmartCardNumber] = useState('')
    const [selectPlan, setSelectPlan] = useState<tvPlans | null>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [pin, setPin] = useState(["", "", "", ""])

    const handleCardClick = (plan: any) => {
        if (!tvNetwork || !smartCardNumber) {
            toast.error('select Tv Provider and input Smart Card Number')
            return
        }
        setSelectPlan(plan)
        setShowPopup(true)
    }

    const handleProcess = () => {
        setShowPin(true)
        setShowPopup(false)
    }

    const handleProcessSubmit = () => {
        const payload = {
            tvNetwork,
            smartCardNumber,
            Name: selectPlan?.Name,
            Plan: selectPlan?.Plan,
            Price: selectPlan?.Price
        }
        console.log('sending to backend:', payload)
    }

    const router = useRouter()
    const HandleClick = () => {
        router.push("/UserDashboard")
    }

    const TvsubPlan: tvPlan[] = [
        { id: 1, Name: "DStv padi", Plan: "1 month", Price: "4,000" },
        { id: 2, Name: "DStv Yanga", Plan: "1 month", Price: "6,000" },
        { id: 3, Name: "DStv Confam", Plan: "1 month", Price: "11,000" },
        { id: 4, Name: "DStv Compact", Plan: "1 month", Price: "1,900" },
        { id: 5, Name: "DStv Compact Plus", Plan: "1 month", Price: "30,000" },
        { id: 6, Name: "DStv Stream Premium", Plan: "1 month", Price: "44,500" },
    ]

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (value && index < 3) document.getElementById(`pin-${index + 1}`)?.focus();
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1a0f0a_0%,#0e0704_40%,#0a0503_100%)]">
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#ff7a3d]/25 blur-2xl" />

            <div className="z-10 mx-auto w-full  px-4 py-6 sm:px-6 sm:py-8 pb-24 flex flex-col gap-5 text-sm">

                {error && (
                    <div className="bg-[#e8563a]/15 border border-[#e8563a]/30 text-[#e8563a] font-semibold text-xs sm:text-sm text-center py-2.5 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Top bar */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={HandleClick}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#d8c3b6] hover:text-white transition"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <p className="font-semibold text-[#fbf3ec] text-base italic font-serif">TV subscription</p>
                    </div>
                    <p className="cursor-pointer font-semibold text-sm text-[#ff7a3d]">History</p>
                </div>

                {/* Provider select */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-3">
                    <select
                        onChange={(e) => setTvNetwork(e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold outline-none border-0 text-[#fbf3ec] cursor-pointer"
                    >
                        <option className="text-black" value="">Select provider</option>
                        <option className="text-black" value="DStv">DStv</option>
                        <option className="text-black" value="Startime">Startime</option>
                        <option className="text-black" value="Shomax">Shomax</option>
                        <option className="text-black" value="Netfilx">Netflix</option>
                    </select>
                </div>

                {/* Smartcard number */}
                <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-[#fbf3ec]">Smartcard number</p>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#8f7768]">
                            Beneficiaries
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ff7a3d]/15 text-[#ff7a3d]">
                                <Users size={13} />
                            </span>
                        </button>
                    </div>
                    <input
                        maxLength={20}
                        value={smartCardNumber}
                        onChange={(e) => setSmartCardNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-transparent font-semibold text-sm outline-none border-0 text-[#fbf3ec] placeholder:text-[#8f7768]"
                        placeholder="00000000"
                    />
                </div>

                {/* Plans */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-3 py-4 sm:px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#ff7a3d] text-[#1a0d05]">Hot offers</span>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/[0.06] text-[#8f7768]">Premium</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {TvsubPlan.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => handleCardClick(plan)}
                                className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-[#301a10] px-3 py-6 cursor-pointer text-center"
                            >
                                <p className="text-sm font-semibold text-[#fbf3ec]">{plan.Name}</p>
                                <span className="text-[10px] font-semibold text-[#1a0d05] bg-gradient-to-r from-[#ff7a3d] to-[#f4b860] px-2 py-0.5 rounded-full">
                                    {plan.Plan}
                                </span>
                                <p className="text-sm font-bold text-[#f4b860]">₦{plan.Price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TV service info */}
                <div className="flex items-center mb-10 gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[#ff7a3d]/15 text-[#ff7a3d]">
                        <Newspaper size={16} />
                    </span>
                    <div>
                        <p className="font-semibold text-sm text-[#fbf3ec]">USSD enquiry</p>
                        <p className="text-xs text-[#8f7768]">Check phone and more</p>
                    </div>
                </div>

                {/* Confirm popup */}
                {showPopup && selectPlan && (
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
                                <SummaryRow label="Service" value={tvNetwork} />
                                <SummaryRow label="Number" value={smartCardNumber} />
                                <SummaryRow label="Plan" value={selectPlan.Name} />
                                <SummaryRow label="Validity" value={selectPlan.Plan} />
                                <SummaryRow label="Price" value={`₦${selectPlan.Price}`} highlight />
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
                                    Input your PIN to pay
                                </h1>
                                <h1 className="font-serif text-2xl font-semibold text-[#f4b860]">
                                    ₦{selectPlan?.Price}
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