"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";


const menuGroups = [
    {
        title: "User Settings",
        items: [
            { label: "My Account", href: "/settings" },
        ],
    },
    {
        title: "App Settings",
        items: [
            { label: "Appearance", href: "/settings/appearance" },
            { label: "Language", href: "/settings/language" },
        ],
    },
];

export default function SettingsSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <div className="w-56 p-4 pt-6 border-r min-h-screen text-sm flex flex-col justify-between">
            <div>
                {/* Back to Home */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                {/* Menu groups */}
                {menuGroups.map((group) => (
                    <div key={group.title} className="mb-6">
                        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                            {group.title}
                        </p>
                        {group.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded transition-colors ${isActive
                                            ? "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Logout button */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
            </button>

        </div>
    );
}
