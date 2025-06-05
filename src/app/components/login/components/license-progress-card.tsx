"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface License {
  start_data: string;
  end_date: string;
  user_id: number;
}

export function LicenseProgressCard({ userId }: { userId: number }) {
  const { t } = useTranslation();
  const [license, setLicense] = useState<License | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const fetchLicense = async () => {
      const res = await fetch(`/api/license?userId=${userId}`);
      if (!res.ok) return;

      const licenses = await res.json();
      const latest = licenses[0];
      if (!latest) return;

      const start = new Date(latest.start_data).getTime();
      const end = new Date(latest.end_date).getTime();
      const now = Date.now();
      const percent = Math.min(
        Math.max(((now - start) / (end - start)) * 100, 0),
        100
      );

      setLicense(latest);
      setProgress(Math.round(percent));
    };

    fetchLicense();
  }, [userId]);

  if (!license || progress === null) return null;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 space-y-2">
      <h4 className="font-semibold text-lg text-gray-800">
        {t("license.title")}
      </h4>
      <p className="text-sm text-gray-600">
        {t("license.range", {
          from: new Date(license.start_data).toLocaleDateString(),
          to: new Date(license.end_date).toLocaleDateString(),
        })}
      </p>
      <Progress value={progress} />
      <p className="text-sm text-gray-700">
        {t("license.used", { percent: progress })}
      </p>
    </div>
  );
}
