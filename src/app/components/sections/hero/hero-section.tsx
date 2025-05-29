"use client";

import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 h-screen w-full px-4 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-3xl px-4 text-white">
        <h1 className="font-days text-5xl sm:text-6xl font-bold leading-tight">
          {t("hero.title")}
        </h1>
        <p className="font-days mt-4 text-sm sm:text-base font-medium">
          {t("hero.scroll")}
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 flex-wrap font-days">
        <a
          href="#visualizer"
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition"
        >
          {t("hero.visualizer")}
        </a>
        <a
          href="#about"
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
        >
          {t("hero.about")}
        </a>
      </div>
    </section>
  );
}
