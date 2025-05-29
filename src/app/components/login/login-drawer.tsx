"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface LoginDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (username: string, role: number) => void;
}

export default function LoginDrawer({
  open,
  onOpenChange,
  onLoginSuccess,
}: LoginDrawerProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (!res.ok) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success(t("login.success"));
      onLoginSuccess(result.user.username, result.user.role_id);
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerTitle className="sr-only">{t("login.title")}</DrawerTitle>
      <DrawerContent className="max-w-3xl w-full p-4">
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">
          {t("login.heading")}
        </h2>

        <Input
          id="username"
          type="text"
          placeholder={t("login.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          className="mb-4 text-gray-900"
        />

        <Input
          id="password"
          type="password"
          placeholder={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mb-6 text-gray-900"
        />
        {error && <p className="text-red-600 text-sm mb-4 ">{error}</p>}

        <Button className="w-full py-3 text-lg" onClick={handleLogin}>
          {t("login.button")}
        </Button>

        <div className="mt-10 space-y-4">
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              t("login.feature1"),
              t("login.feature2"),
              t("login.feature3"),
              t("login.feature4"),
            ].map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
