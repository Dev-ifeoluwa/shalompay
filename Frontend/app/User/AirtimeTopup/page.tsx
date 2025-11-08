"use client"

import { ArrowLeft, CircleUser, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AirtimeTopup() {
    const [network, setNetwork] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [price, setPrice] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [pin, setPin] = useState(["", "", "", ""]);

    const handlePriceClick = (value: any) => {
        setPrice(value.toString())
    }

    const handlePurchaseBtn = () => {
        if (!network || !phoneNumber || !price) {
            toast.error('select network, input phone number and price')
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
        setShowPopup(true)
    }

    const handleProcess = () => {
        setShowPopup(false)
        setShowPin(true)
    }

    const router = useRouter()
    const HandleClick = () => {
        router.push("/UserDashboard")
    }

    const AirtimePrice = [
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
    };

    const handleProcessSubmit = () => {
        const payload = {
            network,
            phoneNumber,
            price
        }
        console.log('sending to backend:', payload)
    }

    return (
        <div className="p-2 mb-15 text-sm md:text-md pt-8 md:pt-5 flex flex-col gap-5">
            {error && (
                <div className="bg-red-400 font-semibold text-white text-[12px] md:text-sm text-center py-2 rounded ">{error}</div>
            )}
            <span className="flex justify-between px-2 items-center">
                <p className="flex items-center gap-3">
                    <ArrowLeft
                        onClick={HandleClick}
                        className="cursor-pointer"
                        size={20} />
                    <p className="font-semibold">Airtime Topup</p>
                </p>
                <p className="cursor-pointer font-semibold">History</p>
            </span>
            <div className="flex items-center justify-between p-1">
                <div className="flex items-center p-1 mt-4">
                    <select name="" id=""
                        onChange={(e) => setNetwork(e.target.value)}
                        className="text-sm font-semibold outline-0 border-0">
                        <option value="">Network</option>
                        <option value="MTN">MTN</option>
                        <option value="Glo">Glo</option>
                        <option value="Airtel">Airtel</option>
                        <option value="9mobile">9mobile</option>
                    </select>
                    <input name="" type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value);

                            if (value.length > 0 && value[0] !== '0') {
                                setError('phone number must start with 0');
                            } else if (value.length > 0 && value.length !== 11) {
                                setError('phone number must be 11 digits');
                            }
                            else {
                                setError('')
                            }
                        }}
                        maxLength={11}
                        className="max-w-50 px-7 py-1 outline-0 border-0"
                        id="" placeholder="Phone number"
                    />
                </div>
                <div
                    className="bg-green-600 rounded-full">
                    <CircleUser className="cursor-pointer text-white" />
                </div>
            </div>
            <div className="flex flex-col gap-5 px-2 rounded-md shadow-sm py-4 shadow-gray-600">
                <p className="text-md font-semibold">Topup Plans</p>
                <div className="grid grid-cols-3 gap-2">
                    {AirtimePrice.map((plan) => (
                        <div key={plan}
                            onClick={() => handlePriceClick(plan)}
                            className="px-3 py-10 shadow-sm shadow-gray-600 rounded-2xl text-md cursor-pointer text-green-800 font-semibold text-center bg-gray-100">
                            ₦{plan}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex justify-between items-center px-3 py-1">
                        <div className="flex items-center gap-1 w-full">
                            <span className="text-lg font-semibold text-black">₦</span>
                            <input
                                maxLength={6}
                                value={price}
                                onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))}
                                className="max-w-85 w-full py-1 pr-2 text-md font-semibold outline-0 border-0"
                                placeholder="50-400,000" />
                        </div>
                        <button
                            onClick={handlePurchaseBtn}
                            className="font-semibold px-3 py-1 cursor-pointer shadow-sm shadow-gray-600 text-white  text-[12px] md:text-sm rounded-2xl bg-linear-to-r from-green-900 to-lime-400">Purchase</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2 shadow-sm rounded-md shadow-gray-600">
                <p className="p-1 text-gray-700 font-semibold">Airtime Service</p>
                <span className="flex items-center gap-2">
                    <Newspaper className="text-gray-700" />
                    <div>
                        <p className="font-semibold text-[12px] text-sm">USSD enquiry</p>
                        <p className="text-[12px] text-sm">Check phone and more</p>
                    </div>
                </span>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex flex-col justify-between bg-opacity-50 backdrop-blur-[3px] w-full h-screen">
                    {/* top */}
                    <div>
                    </div>
                    {/* bottom */}
                    <div className="fixed mb-13 p-2 shadow-md
                            rounded-t-3xl shadow-t-sm bg-white shadow-gray-400 w-full  h-55 md:max-w-2xl mx-auto
                            bottom-0 left-0 right-0 justify-center z-50">
                        <div className=" p-3 space-y-7 rounded-2xl">
                            <div className="flex flex-col gap-4">
                                <p className="flex justify-between items-center px-4"><strong>Service: </strong>{network}</p>
                                <p className="flex justify-between items-center px-4"><strong>Number: </strong>{phoneNumber}</p>
                                <p className="flex justify-between items-center px-4"><strong>Price: </strong>₦{price}</p>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <button
                                    className="cursor-pointer w-[150px] bg-linear-to-r from-green-900 to-lime-400 text-white px-4 py-2 rounded-2xl"
                                    onClick={handleProcess}
                                >Process
                                </button>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="bg-gray-600 w-[150px] text-white cursor-pointer px-4 py-2 rounded-2xl">Cancel</button>
                            </div>
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
                            <h1 className="flex justify-between items-center px-4 font-bold text-2xl">₦{price}</h1>
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
                                onClick={handleProcessSubmit}>Buy Now</button>
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