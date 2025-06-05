"use client";

import { useState } from "react";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import LoginDrawer from "./login/login-drawer";
import UserDrawer from "./login/user-drawer";
import { useTranslation } from "react-i18next";
import "@/lib/i18n"; // ensure it's initialized

export default function Navbar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const { t, i18n } = useTranslation();

  const handleLoginSuccess = (username: string, role: number, id: number) => {
    setLoggedInUsername(username);
    setUserRole(role);
    setUserId(id);
  };

  const handleLogout = () => {
    setLoggedInUsername(null);
    setUserRole(null);
  };

  return (
    <>
      <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-10 z-50">
        <Image src="/logo.png" alt="Logo" width={70} height={70} />
        <nav className="font-days flex gap-10 text-lg font-medium">
          <a href="#about" className="hover:underline">
            {t("about")}
          </a>
          <a href="#visualizer" className="hover:underline">
            {t("visualizer-label")}
          </a>
          <a href="#contact" className="hover:underline">
            {t("contact-label")}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <button onClick={() => i18n.changeLanguage("hr")}>
              <img
                src="https://flagcdn.com/w40/hr.png"
                alt="HR"
                width={24}
                height={16}
                //className="rounded-sm"
              />
            </button>
            <button onClick={() => i18n.changeLanguage("en")}>
              <img
                src="https://flagcdn.com/w40/gb.png"
                alt="EN"
                width={24}
                height={16}
                //className="rounded-sm"
              />
            </button>
          </div>

          <div
            className="font-days flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDrawer(true)}
          >
            <CircleUserRound className="w-5 h-5" />
            <span>{loggedInUsername ?? t("login-label")}</span>
          </div>
        </div>
      </div>

      {!loggedInUsername ? (
        <LoginDrawer
          open={showDrawer}
          onOpenChange={setShowDrawer}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <UserDrawer
          open={showDrawer}
          onOpenChange={setShowDrawer}
          username={loggedInUsername}
          role={userRole ?? 1}
          userId={userId ?? 1}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
