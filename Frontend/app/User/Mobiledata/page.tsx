"use client"

import { ArrowLeft, CircleUser, Newspaper, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type DataPlan = {
    dataPlan: string;
    Validity: string;
    Price: string;
}

type DataPlans = {
    dataPlan: string;
    Validity: string;
    Price: string;
}

export default function MobileDataTopup() {
    const router = useRouter()
    const HandleClick = () => {
        router.push("/UserDashboard")
    }

    const [network, setNetwork] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectPlan, setSelectPlan] = useState<DataPlans | null>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState<'Hot' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Hot')
    const [filteredPlan, setFilteredPlan] = useState<DataPlans[]>([])
    const [showPin, setShowPin] = useState(false)
    const [pin, setPin] = useState(["", "", "", ""]);

    useEffect(() => {
        filterPlan('Hot')
    }, [])

    const tabs = ['Hot', 'Daily', 'Weekly', 'Monthly', 'Yearly'];

    const filterPlan = (tab: 'Hot' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly') => {
        setActiveTab(tab)
        let durationFilter = ''
        switch (tab) {
            case 'Hot':
                durationFilter = 'Day';
                break;
            case 'Daily':
                durationFilter = '1 Day';
                break
            case 'Weekly':
                durationFilter = '7 Days';
                break
            case 'Monthly':
                durationFilter = '30 Days';
                break
            case 'Yearly':
                durationFilter = 'Year';
                break
        }
        const filtered = DataPrice.filter((plan) => plan.Validity.includes(durationFilter))
        setFilteredPlan(filtered)
    }

    const handleTabClick = (tab: 'Hot' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly') => {
        filterPlan(tab)
    }

    const handleCardClick = (plan: any) => {
        if (!network || !phoneNumber) {
            toast.error('select network and enter phone number')
            return
        }

        if (!phoneNumber.startsWith('0')) {
            setError('Phone number must start with 0');
            setShowPopup(false);
            return;
        }

        if (phoneNumber.length !== 11) {
            setError('Phone number must be 11 digits');
            setShowPopup(false);
            return;
        }

        setError('');
        setSelectPlan(plan)
        setShowPopup(true)
    }

    const handleProcess = () => {
        setShowPopup(false)
        setShowPin(true)
    }

    const handleProcessSubmit = () => {
        const payload = {
            network,
            phoneNumber,
            dataPlan: selectPlan?.dataPlan,
            validity: selectPlan?.Validity,
            price: selectPlan?.Price
        }
        console.log('sending to backend:', payload);
    }

    const DataPrice: DataPlan[] = [
        { dataPlan: "1GB", Validity: "1 Day", Price: "₦500" },
        { dataPlan: "2.5GB", Validity: "2 Days", Price: "₦500" },
        { dataPlan: "500MB", Validity: "7 Days", Price: "₦500" },
        { dataPlan: "1GB", Validity: "7 Days", Price: "₦800" },
        { dataPlan: "2.5GB", Validity: "1 Day", Price: "₦750" },
        { dataPlan: "2GB", Validity: "30 Days", Price: "₦1,500" },
        { dataPlan: "3.5GB", Validity: "30 Days", Price: "₦500" },
        { dataPlan: "20GB", Validity: "7 Days", Price: "₦5,000" },
        { dataPlan: "25GB", Validity: "30 Days", Price: "₦15,000" },
        { dataPlan: "60GB", Validity: "Year", Price: "₦75,000" },
        { dataPlan: "100GB", Validity: "Year", Price: "₦110,000" },
    ]

    const handleChange = (value: string, index: number) => {
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
                        <p className="font-semibold text-[#fbf3ec] text-base italic font-serif">Mobile Data</p>
                    </div>
                    <p className="cursor-pointer font-semibold text-sm text-[#ff7a3d]">History</p>
                </div>

                {/* Network + phone number */}
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <select
                            onChange={(e) => setNetwork(e.target.value)}
                            className="bg-transparent text-sm font-semibold outline-none border-0 text-[#fbf3ec] cursor-pointer flex-shrink-0"
                        >
                            <option className="text-black" value="">Network</option>
                            <option className="text-black" value="MTN">MTN</option>
                            <option className="text-black" value="Glo">Glo</option>
                            <option className="text-black" value="Airtel">Airtel</option>
                            <option className="text-black" value="9mobile">9mobile</option>
                        </select>
                        <span className="w-px h-5 bg-white/[0.1] flex-shrink-0" />
                        <input
                            name="tel"
                            id="tel"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setPhoneNumber(value);

                                if (value.length > 0 && value[0] !== '0') {
                                    setError('phone number must start with 0');
                                } else if (value.length > 0 && value.length !== 11) {
                                    setError('phone number must be 11 digits');
                                } else {
                                    setError('')
                                }
                            }}
                            maxLength={11}
                            className="w-full bg-transparent outline-none border-0 text-sm text-[#fbf3ec] placeholder:text-[#8f7768]"
                            placeholder="Phone number"
                        />
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#ff7a3d]/15 text-[#ff7a3d]">
                        <CircleUser size={18} />
                    </div>
                </div>

                {/* Plans */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#26140c] px-3 py-4 sm:px-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab as 'Hot' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly')}
                                className={`text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition ${
                                    activeTab === tab
                                        ? "bg-[#ff7a3d] text-[#1a0d05]"
                                        : "bg-white/[0.06] text-[#8f7768]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {filteredPlan.map((plan: DataPlan, index: number) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(plan)}
                                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#301a10] px-2 py-4 cursor-pointer text-center"
                            >
                                <p className="font-bold text-sm text-[#fbf3ec]">{plan.dataPlan}</p>
                                <span className="text-[10px] font-semibold text-[#1a0d05] bg-gradient-to-r from-[#ff7a3d] to-[#f4b860] px-2 py-0.5 rounded-full">
                                    {plan.Validity}
                                </span>
                                <p className="text-[11px] text-[#8f7768]">{plan.Price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data service info */}
                <div className="flex items-center gap-3 mb-10 rounded-2xl border border-white/[0.08] bg-[#26140c] px-4 py-4">
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
                        <div className="mb-0 bg-[#1e100a] border-t border-white/[0.08] left-0 right-0 p-5 sm:p-6 rounded-t-3xl w-full md:max-w-lg mx-auto">
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
                                <SummaryRow label="Service" value={network} />
                                <SummaryRow label="Number" value={phoneNumber} />
                                <SummaryRow label="Data plan" value={selectPlan.dataPlan} />
                                <SummaryRow label="Validity" value={selectPlan.Validity} />
                                <SummaryRow label="Price" value={selectPlan.Price} highlight />
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
                                    {selectPlan?.Price}
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