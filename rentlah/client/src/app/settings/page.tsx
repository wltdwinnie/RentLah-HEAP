"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { authClient } from "@/lib/authClient";
import Image from "next/image";

export default function MyAccountPage() {
  const [user, setUser] = useState<{ email: string; name?: string; image?: string | null } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      const session = (await authClient.getSession()).data;
      if (session?.user) {
        setUser({
          email: session.user.email,
          name: session.user.name || session.user.email.split("@")[0],
          image: session.user.image,
        });
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="max-w-md p-6 space-y-6 relative">
      {/* ✅ Profile Picture */}
      {user.image && (
        <>
          <div className="flex justify-center">
            <Image
              src={user.image}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border shadow-md cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>

          {/* ✅ Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl max-w-sm w-full">
                <Image
                  src={user.image || ''}
                  alt="Zoomed Profile"
                  width={400}
                  height={400}
                  className="w-full rounded-md object-cover"
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 w-full py-2 bg-zinc-200 dark:bg-zinc-700 rounded text-center"
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <h1 className="text-xl font-semibold text-center">{t("My Account")}</h1>

      {/* Username */}
      <div className="space-y-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          {t("username")}
        </label>
        <div className="w-full rounded-md border bg-zinc-50 dark:bg-zinc-800 p-3 text-sm">
          {user.name}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          {t("verified-email")}
        </label>
        <div className="w-full rounded-md border bg-zinc-50 dark:bg-zinc-800 p-3 text-sm">
          {user.email}
        </div>
      </div>
    </div>
  );
}
