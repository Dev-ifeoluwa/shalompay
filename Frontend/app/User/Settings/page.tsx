"use client";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Bell,
    Fingerprint,
    Lock,
    Globe,
    Moon,
    Landmark,
    FileText,
    ShieldQuestion,
    LogOut,
    Trash2,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Preloader from "components/preloader";

export default function SettingsPage() {
    const router = useRouter();
    const [dashboard, setDashboard] = useState<any>(null);
    const [pushEnabled, setPushEnabled] = useState(true);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

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
                setPushEnabled(data.dashboard?.pushEnabled ?? true);
                setBiometricEnabled(data.dashboard?.biometricEnabled ?? false);
            } else if (res.status === 401) {
                console.error("Unauthorized, redirecting to signin.");
                router.push('/Account/Signin');
            } else {
                console.error("Failed to fetch dashboard data.");
            }
        }
        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/Account/Signin');
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

                    <div className="z-10 mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:max-w-2xl">

                        {/* Top bar */}
                        <div className="flex items-center gap-3 mb-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#d8c3b6] hover:text-white transition"
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <h1 className="text-lg sm:text-xl font-semibold italic font-serif text-[#fbf3ec]">
                                Settings
                            </h1>
                        </div>

                        {/* Notifications & security */}
                        <p className="text-xs font-bold text-[#8f7768] mb-2.5 px-1">Notifications & security</p>
                        <div className="rounded-2xl border border-white/[0.08] bg-[#26140c] divide-y divide-white/[0.06] overflow-hidden">
                            <ToggleRow
                                icon={<Bell size={16} />}
                                tone="tone-1"
                                label="Push notifications"
                                sub="Alerts for transactions and promos"
                                checked={pushEnabled}
                                onChange={setPushEnabled}
                            />
                            <ToggleRow
                                icon={<Fingerprint size={16} />}
                                tone="tone-2"
                                label="Biometric login"
                                sub="Use fingerprint or face unlock"
                                checked={biometricEnabled}
                                onChange={setBiometricEnabled}
                            />
                            <LinkRow
                                icon={<Lock size={16} />}
                                tone="tone-3"
                                label="Change transaction PIN"
                                href="/User/Settings/Pin"
                            />
                        </div>

                        {/* Preferences */}
                        <p className="text-xs font-bold text-[#8f7768] mt-7 mb-2.5 px-1">Preferences</p>
                        <div className="rounded-2xl border border-white/[0.08] bg-[#26140c] divide-y divide-white/[0.06] overflow-hidden">
                            <ToggleRow
                                icon={<Moon size={16} />}
                                tone="tone-1"
                                label="Dark mode"
                                sub="Always on for now"
                                checked={darkMode}
                                onChange={setDarkMode}
                            />
                            <LinkRow
                                icon={<Globe size={16} />}
                                tone="tone-2"
                                label="Language"
                                value="English"
                                href="/User/Settings/Language"
                            />
                            <LinkRow
                                icon={<Landmark size={16} />}
                                tone="tone-3"
                                label="Default currency"
                                value="NGN"
                                href="/User/Settings/Currency"
                            />
                        </div>

                        {/* Legal & support */}
                        <p className="text-xs font-bold text-[#8f7768] mt-7 mb-2.5 px-1">Legal & support</p>
                        <div className="rounded-2xl border border-white/[0.08] bg-[#26140c] divide-y divide-white/[0.06] overflow-hidden">
                            <LinkRow
                                icon={<ShieldQuestion size={16} />}
                                tone="tone-1"
                                label="Help centre"
                                href="/User/Support"
                            />
                            <LinkRow
                                icon={<FileText size={16} />}
                                tone="tone-2"
                                label="Terms & privacy policy"
                                href="/User/Legal"
                            />
                        </div>

                        {/* Danger zone */}
                        <p className="text-xs font-bold text-[#8f7768] mt-7 mb-2.5 px-1">Account</p>
                        <div className="rounded-2xl border border-white/[0.08] bg-[#26140c] divide-y divide-white/[0.06] overflow-hidden">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3.5 sm:px-5 text-left"
                            >
                                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#e8563a]/15 text-[#e8563a]">
                                    <LogOut size={16} />
                                </span>
                                <span className="flex-1 text-sm font-semibold text-[#e8563a]">Log out</span>
                            </button>
                            <Link
                                href="/User/Settings/DeleteAccount"
                                className="w-full flex items-center gap-3 px-4 py-3.5 sm:px-5 text-left"
                            >
                                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#e8563a]/15 text-[#e8563a]">
                                    <Trash2 size={16} />
                                </span>
                                <span className="flex-1 text-sm font-semibold text-[#e8563a]">Delete account</span>
                                <ChevronRight size={16} className="text-[#8f7768]" />
                            </Link>
                        </div>

                        <p className="text-center text-[11px] text-[#8f7768] mt-6">
                            Sollnispay v2.4.1
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

function ToggleRow({
    icon,
    tone,
    label,
    sub,
    checked,
    onChange,
}: {
    icon: React.ReactNode;
    tone: "tone-1" | "tone-2" | "tone-3";
    label: string;
    sub?: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    const toneClasses = {
        "tone-1": "bg-[#ff7a3d]/15 text-[#ff7a3d]",
        "tone-2": "bg-[#f4b860]/15 text-[#f4b860]",
        "tone-3": "bg-[#d8c3b6]/10 text-[#d8c3b6]",
    };

    return (
        <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <span className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-[10px] ${toneClasses[tone]}`}>
                {icon}
            </span>
            <span className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#fbf3ec]">{label}</p>
                {sub && <span className="text-[11.5px] text-[#8f7768]">{sub}</span>}
            </span>
            <button
                onClick={() => onChange(!checked)}
                className={`relative flex-shrink-0 w-11 h-6 rounded-full transition ${
                    checked ? "bg-[#ff7a3d]" : "bg-white/[0.12]"
                }`}
            >
                <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        checked ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                />
            </button>
        </div>
    );
}

function LinkRow({
    icon,
    tone,
    label,
    sub,
    value,
    href,
}: {
    icon: React.ReactNode;
    tone: "tone-1" | "tone-2" | "tone-3";
    label: string;
    sub?: string;
    value?: string;
    href: string;
}) {
    const toneClasses = {
        "tone-1": "bg-[#ff7a3d]/15 text-[#ff7a3d]",
        "tone-2": "bg-[#f4b860]/15 text-[#f4b860]",
        "tone-3": "bg-[#d8c3b6]/10 text-[#d8c3b6]",
    };

    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <span className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-[10px] ${toneClasses[tone]}`}>
                {icon}
            </span>
            <span className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#fbf3ec]">{label}</p>
                {sub && <span className="text-[11.5px] text-[#8f7768]">{sub}</span>}
            </span>
            {value && <span className="text-xs text-[#8f7768] flex-shrink-0">{value}</span>}
            <ChevronRight size={16} className="text-[#8f7768] flex-shrink-0" />
        </Link>
    );
}