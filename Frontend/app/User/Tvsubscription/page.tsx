"use client"

import { ArrowLeft, CircleUser, Newspaper } from "lucide-react";
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
        {
            id: 1,
            Name: "DStv padi",
            Plan: "1 month",
            Price: "4,000"
        },
        {
            id: 2,
            Name: "DStv Yanga",
            Plan: "1 month",
            Price: "6,000"
        },
        {
            id: 3,
            Name: "DStv Confam",
            Plan: "1 month",
            Price: "11,000"
        },
        {
            id: 4,
            Name: "DStv Compact",
            Plan: "1 month",
            Price: "1,900"
        },
        {
            id: 5,
            Name: "DStv Compact Plus",
            Plan: "1 month",
            Price: "30,000"
        },
        {
            id: 6,
            Name: "DStv Stream Premium",
            Plan: "1 month",
            Price: "44,500"
        },
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
        <div className="p-2 mb-15 text-sm md:text-md flex pt-8 flex-col gap-5">
            <span className="flex justify-between px-2 items-center">
                <p className="flex items-center gap-3">
                    <ArrowLeft
                        onClick={HandleClick}
                        className="cursor-pointer"
                        size={20} />
                    <p className="font-semibold">Tv subscription</p>
                </p>
                <p className="cursor-pointer font-semibold">History</p>
            </span>
            <div className="flex flex-col p-2">
                <div className="flex items-center p-1 mt-4">
                    <select name=""
                        onChange={(e) => setTvNetwork(e.target.value)}
                        id="" className="text-sm font-semibold outline-0 border-0">
                        <option value="">Select</option>
                        <option value="DStv">DStv</option>
                        <option value="Startime">Startime</option>
                        <option value="Shomax">Shomax</option>
                        <option value="Netfilx">Netfilx</option>
                    </select>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-[13px] md:text-sm">Smartcard Number</p>
                        <div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <p>Beneficiaries</p>
                                <span className="bg-green-600 rounded-full">
                                    <CircleUser className="cursor-pointer text-white" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <input name=""
                        maxLength={20}
                        value={smartCardNumber}
                        onChange={(e) => setSmartCardNumber(e.target.value.replace(/\D/g, ''))}
                        className="max-w-50 pr-2 mt-3 font-semibold text-md py-1 outline-0 border-0"
                        id="" placeholder="00000000" />
                </div>
            </div>
            <div className="flex flex-col gap-5 px-2 rounded-md shadow-sm py-4 shadow-gray-600">
                <div className="flex gap-4 items-center text-gray-600">
                    <p className="text-md font-semibold">Hot Offers</p>
                    <p className="text-md font-semibold">Premium</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {TvsubPlan.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => handleCardClick(plan)}
                            className="px-3 py-10 flex flex-col gap-2 shadow-sm shadow-gray-600 rounded-2xl text-md cursor-pointer text-green-800 font-semibold text-center bg-gray-100">
                            <p>{plan.Name}</p>
                            <p className="text-[12px] md:text-sm text-gray-200 bg-linear-to-r from-green-900 to-lime-400">{plan.Plan}</p>
                            <p className="text-[14px] md:text-sm">₦{plan.Price}</p>
                        </div>
                    ))}
                </div>
                <div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2 shadow-sm rounded-md shadow-gray-600">
                <p className="p-1 text-gray-700 font-semibold">Tv Service</p>
                <span className="flex items-center gap-2">
                    <Newspaper className="text-gray-700" />
                    <div>
                        <p className="font-semibold text-[12px] text-sm">USSD enquiry</p>
                        <p className="text-[12px] text-sm">Check phone and more</p>
                    </div>
                </span>
            </div>
            {showPopup && selectPlan && (
                <div className="fixed inset-0 flex flex-col justify-between bg-opacity-50 backdrop-blur-[3px] w-full h-screen">
                    {/* top */}
                    <div>
                    </div>
                    {/* bottom */}
                    <div className="fixed bottom-0 bg-white mb-13 left-0 right-0 p-4 shadow-md
                        rounded-t-3xl shadow-t-sm w-full md:max-w-2xl mx-auto">
                        <div className="flex flex-col gap-3">
                            <p className="flex justify-between items-center px-4"><strong>Service: </strong>{tvNetwork}</p>
                            <p className="flex justify-between items-center px-4"><strong>Number: </strong>{smartCardNumber}</p>
                            <p className="flex justify-between items-center px-4"><strong>Data plan: </strong>{selectPlan.Name}</p>
                            <p className="flex justify-between items-center px-4"><strong>Validity: </strong>{selectPlan.Plan}</p>
                            <p className="flex justify-between items-center px-4"><strong>Price: </strong>₦{selectPlan.Price}</p>
                        </div>
                        <div className="flex mt-4 justify-between items-center">
                            <button
                                className="cursor-pointer w-[150px] bg-linear-to-r from-green-900 to-lime-400 text-white px-4 py-2 rounded-2xl"
                                onClick={handleProcess}
                            >Process</button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-600 w-[150px] text-white cursor-pointer px-4 py-2 rounded-2xl">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showPin && (
                <div className="fixed inset-0 flex flex-col justify-between bg-opacity-50 backdrop-blur-[3px] w-full h-screen">
                    {/* top */}
                    <div>
                    </div>
                    {/* bottom */}
                    <div className="bg-white mb-5 left-0 right-0 p-4 shadow-md
                        rounded-t-3xl shadow-t-sm w-full md:max-w-2xl mx-auto">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="flex justify-between items-center text-lg px-4 font-bold">Input your pin to pay</h1>
                            <h1 className="flex justify-between items-center px-4 font-bold text-2xl">₦{selectPlan?.Price}</h1>
                            <div className="flex justify-center gap-3 mb-8">
                                {pin.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`pin-${i}`}
                                        type="password"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, i)}
                                        className="w-10 h-10 text-center text-lg font-semibold border-b-2 border-gray-500 focus:border-green-500 outline-none"
                                    />
                                ))}
                            </div>
                            <button className="flex cursor-pointer font-semibold text-green-800 text-[14px] justify-between items-center px-4">forgot PIN</button>
                        </div>
                        <div className="flex mt-4 mb-15 justify-between items-center">
                            <button
                                className="cursor-pointer w-[150px] bg-linear-to-r from-green-900 to-lime-400 text-white px-4 py-2 rounded-2xl"
                                onClick={handleProcessSubmit}
                            >Buy Now</button>
                            <button
                                onClick={() => setShowPin(false)}
                                className="bg-gray-600 w-[150px] text-white cursor-pointer px-4 py-2 rounded-2xl">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    )
}