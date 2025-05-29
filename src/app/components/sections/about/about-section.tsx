"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      className="bg-white text-black h-screen flex flex-col items-center justify-center text-center px-4"
      id="about"
    >
      <h2 className="font-days text-2xl font-bold mb-4">
        {t("aboutSection.title")}
      </h2>
      <p className="font-days max-w-xl mx-auto text-sm mb-10">
        {t("aboutSection.description")}
      </p>

      <div className="flex justify-center items-center gap-12 flex-wrap px-4">
        <Image src="/emmezeta.jpeg" alt="Emmezeta" width={140} height={100} />
        <Image src="/jysk.png" alt="Jysk" width={240} height={200} />
        <Image src="/lesnina.jpeg" alt="Lesnina" width={220} height={100} />
        <Image src="/prima.jpeg" alt="Prima" width={240} height={100} />
      </div>
    </section>
  );
}
