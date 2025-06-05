"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useFetchReports } from "../sections/contact/hooks/useFetchReports";
import { useTranslation } from "react-i18next";
import { LicenseProgressCard } from "./components/license-progress-card";

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  role: number;
  userId: number;
  onLogout: () => void;
}

export default function UserDrawer({
  open,
  onOpenChange,
  username,
  role,
  onLogout,
  userId,
}: UserDrawerProps) {
  const { data: reportsData } = useFetchReports();
  const { t } = useTranslation();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerTitle className="sr-only">{t("user.title")}</DrawerTitle>
      <DrawerContent className="max-w-md w-full p-6 overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">
          {t("user.welcome")}, {username}
        </h2>

        {role === 1 && (
          <>
            <h3 className="font-semibold mb-4 text-lg">{t("user.reports")}</h3>
            {reportsData?.length === 0 && (
              <p className="text-gray-600">{t("user.noReports")}</p>
            )}
            <div className="space-y-4 max-h-[60vh] overflow-auto">
              {reportsData?.map((report: any) => (
                <div
                  key={report.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{new Date(report.created_at).toLocaleString()}</span>
                    <span>
                      {t("user.category")}: {report.category_id}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {report.name}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    {report.email}
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {report.message}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {role === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-3">{t("user.role2Title")}</h3>
            <LicenseProgressCard userId={userId} />
          </div>
        )}

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={() => {
            onLogout();
            onOpenChange(false);
          }}
        >
          {t("user.logout")}
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
