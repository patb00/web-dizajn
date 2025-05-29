"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Send,
  MapPin,
} from "lucide-react";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { useCreateReport } from "./hooks/useCreateReport";
import { ReportInputs, reportSchema } from "./zodScheme/reportSchema";

export default function ContactSection() {
  const { t } = useTranslation();
  const { data: categoriesData } = useFetchCategories();
  const createReport = useCreateReport();

  const [form, setForm] = useState<ReportInputs>({
    fullName: "",
    email: "",
    message: "",
    selectedCategoryId: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ReportInputs, string>>
  >({});

  const handleCategorySelect = (id: number) => {
    setForm((f) => ({ ...f, selectedCategoryId: id }));
    setErrors((e) => ({ ...e, selectedCategoryId: undefined }));
  };

  const handleChange = (field: keyof ReportInputs, value: string | number) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = () => {
    const result = reportSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReportInputs, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ReportInputs] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    createReport.mutate(
      {
        name: form.fullName,
        email: form.email,
        message: form.message,
        category_id: form.selectedCategoryId,
      },
      {
        onSuccess: () => {
          setForm({
            fullName: "",
            email: "",
            message: "",
            selectedCategoryId: 0,
          });
        },
      }
    );
  };

  return (
    <section
      id="contact"
      className="h-screen bg-white flex items-center justify-center px-4"
    >
      <div className="flex w-full max-w-6xl bg-[#c19c7d] rounded-xl overflow-hidden shadow-lg text-[#4a2f24]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-[#c19c7d] p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
            <h3 className="text-2xl font-bold text-[#4a2f24] mt-2">
              {t("contact.subtitle")}
            </h3>
          </div>
          <div className="mt-10 space-y-4 text-sm">
            <p className="flex items-center gap-2 pl-4">
              <Mail className="w-5 h-5 text-[#4a2f24]" />
              info.interior@gmail.com
            </p>
            <p className="flex items-center gap-2 bg-[#5b3628] px-4 py-2 rounded-md text-white font-medium">
              <Phone className="w-5 h-5" />
              <span className="pl-1">+385 99 734 159 1</span>
            </p>
            <p className="flex items-center gap-2 pl-4">
              <MapPin className="w-5 h-5 text-[#4a2f24]" />
              Slavonska Av. 1c, 10000, Zagreb
            </p>
          </div>
          <div className="flex items-center gap-8 mt-6 text-[#4a2f24]">
            <Facebook className="w-6 h-6 cursor-pointer hover:text-[#3b5998]" />
            <div className="rounded-full bg-[#6d4a37] p-2 cursor-pointer hover:bg-[#8b5e44] flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <Twitter className="w-6 h-6 cursor-pointer hover:text-[#1da1f2]" />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-1/2 bg-[#eeeeee] p-10 rounded-tr-xl rounded-br-xl flex flex-col gap-6">
          <h4 className="font-semibold text-sm">{t("contact.interest")}</h4>
          <div className="flex flex-wrap gap-2">
            {categoriesData?.map((category: { id: number; name: string }) => (
              <Button
                key={category.id}
                variant={
                  form.selectedCategoryId === category.id
                    ? "default"
                    : "outline"
                }
                className={
                  form.selectedCategoryId === category.id
                    ? "bg-[#5b3628] text-white"
                    : undefined
                }
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name.trim()}
              </Button>
            ))}
          </div>

          <div>
            <Label htmlFor="fullName" className="mb-1 text-gray-700">
              {t("contact.fullName")}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder={t("contact.fullName")}
              className="bg-transparent border-b border-[#5b3628] text-gray-900"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-1 text-gray-700">
              {t("contact.email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("contact.email")}
              className="bg-transparent border-b border-gray-300 text-gray-700"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="mb-1 text-gray-700">
              {t("contact.message")}
            </Label>
            <Textarea
              id="message"
              placeholder={t("contact.message")}
              rows={3}
              className="bg-transparent border-b border-gray-300 text-gray-700"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {errors.selectedCategoryId && (
            <p className="text-red-600 text-sm mt-1">
              {errors.selectedCategoryId}
            </p>
          )}

          <Button
            className="self-start bg-[#5b3628] text-white px-6 py-2"
            type="button"
            onClick={handleSubmit}
          >
            <Send className="mr-2" />
            {t("contact.send")}
          </Button>
        </div>
      </div>
    </section>
  );
}
