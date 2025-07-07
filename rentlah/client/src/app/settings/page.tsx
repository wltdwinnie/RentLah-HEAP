"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


import { authClient } from "@/lib/authClient";

type SessionUser = {
  email: string;
  user_metadata?: {
    name?: string;
  };
};

type SessionData = {
  user?: SessionUser;
};

export default function MyAccountPage() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const { t } = useTranslation(); // <-- translation hook

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession() as unknown as SessionData;

      console.log("Session:", session);

      if (session?.user) {
        setUser({
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
        });
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="max-w-md p-6 space-y-6">
      <h1 className="text-xl font-semibold">{t("myAccount")}</h1>

      {/* Username Box */}
      <div className="space-y-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          {t("username")}
        </label>
        <div className="w-full rounded-md border bg-zinc-50 dark:bg-zinc-800 p-3 text-sm text-black dark:text-white">
          {user.name}
        </div>
      </div>

      {/* Email Box */}
      <div className="space-y-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          {t("verifiedEmail")}
        </label>
        <div className="w-full rounded-md border bg-zinc-50 dark:bg-zinc-800 p-3 text-sm text-black dark:text-white">
          {user.email}
        </div>
      </div>
    </div>
  );
}
