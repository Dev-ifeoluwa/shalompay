"use client";

import { useRouter } from "next/navigation";
import {
  LucideIcon,
  Save,
  Home,
  ArrowLeft,
  Settings,
  Workflow,
  ShoppingBag,
  HomeIcon,
  LogOut,
  CircleQuestionMark,
  MailQuestionMarkIcon,
  Newspaper,
  Contact,

} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Preloader from "components/preloader";
import toast, { Toaster } from "react-hot-toast";

type Settings = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<any>(null)
  const handlebackClick = () => {
    router.push("/UserDashboard");
  };

  const API_URL = process.env.NEST_DEPLOYMENT_API_URL || 'http://localhost:5000';

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
        // credentials: "include",
      })
      if (res.ok) {
        const data = await res.json();
        console.log('user Info', data);
        setDashboard(data.dashboard);
      } else if (res.status === 401) {
        console.error("Unauthorized, redirecting to signin.");
        router.push('/Account/Signin');
      }
    }
    fetchDashboard();
  }, [API_URL, router]);

  if (!dashboard) return <Preloader />;




  const handleLogout = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // important to send cookies!
    });

    if (res.ok) {
      toast.success("logout successfully!")
      localStorage.removeItem('token'); // Remove token from localStorage
      router.push('/Account/loginaccount'); // Redirect to Signin page
    } else {
      console.error("Failed to logout");
    }
  } catch (err) {
    console.error("Error logging out:", err);
  }
};



  const SettingsitemsTop: Settings[] = [
    {
      icon: Home,
      title: "Go Home",
      href: "/UserDashboard",
    },
    {
      icon: Settings,
      title: "Settings",
      href: "/User/Settings",
    },
    {
      icon: Save,
      title: "Refer And Earn",
      href: "/User/earn",
    },
  ];

  const SettingsitemsBottom: Settings[] = [
    {
      icon: ShoppingBag,
      title: "Shop Here",
      href: "/",
    },
    {
      icon: HomeIcon,
      title: "Partner with Us",
      href: "/",
    },
    {
      icon: Workflow,
      title: "Find A Job",
      href: "/",
    },
  ];

  return (
    <>
      <div className="p-2 mb-15 text-sm md:text-md flex flex-col pt-5 gap-3">
        <p className="flex items-center gap-3">
          <ArrowLeft
            onClick={handlebackClick}
            className="cursor-pointer"
            size={20}
          />
          <p className="font-semibold">My Profile</p>
        </p>
        <div className="bg-linear-to-r from-lime-400 to-green-800 shadow-gray-400 text-center justify-center mt-5 shadow-sm px-2 py-3 rounded-lg">
          <div className="p-3">
            <span className="py-3 px-3.5 text-sm font-bold text-gray-700 bg-gray-200 rounded-full">{`${dashboard.firstName?.[0] ?? "U"}${dashboard.lastName?.[0] ?? ""}`}</span>
            <p className="mt-5 text-lg md:text-xl font-semibold text-white">{dashboard.firstName} {dashboard.lastName}</p>
          </div>
          <span className="text-2xl md:text-3xl font-bold text-white">₦{dashboard.balance.toFixed(2)}</span>
          <div className="flex items-center gap-9 text-white md:gap-20 mt-3 p-3 justify-center whitespace-nowrap">
            <Link href={"/"} className="flex flex-col items-center">
              <span className="bg-green-900 p-2 rounded-full"><Contact size={19} /></span>
              <p>Contact</p>
            </Link>
            <Link href={"/"} className="flex flex-col items-center">
              <span className="bg-green-900 p-2 rounded-full"><CircleQuestionMark size={19} /></span>
              <p>FAQs</p>
            </Link>
            <Link href={"/"} className="flex flex-col items-center">
              <span className="bg-green-900 p-2 rounded-full"><Newspaper size={19} /></span>
              <p>Blog</p>
            </Link>
            <button onClick={handleLogout} className="flex flex-col items-center">
              <span className="bg-green-900 cursor-pointer p-2 rounded-full"><LogOut size={19} /></span>
              <p>SIgn Out</p>
            </button>
          </div>
        </div>
        <div className="shadow-gray-400 shadow-sm px-2 py-3 rounded-lg">
          <h2 className="font-semibold p-3 text-md mb-2 md:text-xl">Menu</h2>
          <div className="flex flex-col gap-5">
            {SettingsitemsTop.map(({ title, href, icon: Icon }) => (
              <Link href={href} key={title} className="flex items-center gap-3">
                <div className="p-1 rounded-full text-white bg-linear-to-r from-green-900 to-lime-400"><Icon size={18} /></div>
                <p>{title}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="shadow-gray-400 shadow-sm px-2 py-3 rounded-lg">
          <h2 className="font-semibold p-3 text-md mb-2 md:text-xl">Other service</h2>
          <div className="flex flex-col gap-5">
            {SettingsitemsBottom.map(({ title, href, icon: Icon }) => (
              <Link href={href} key={title} className="flex items-center gap-3">
                <div className="p-1 rounded-full text-white bg-linear-to-r from-green-900 to-lime-400"><Icon size={18} /></div>
                <p>{title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
