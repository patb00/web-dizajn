"use client";

import { useState } from "react";
import { useFetchModels } from "../hooks/useGetModels";
import { useModelStore } from "../store/model-store";
import {
  Archive,
  Table,
  LayoutGrid,
  Bed,
  LampDesk,
  Box,
  ChevronRight,
  Menu,
  ArrowRight,
  Table2,
  Armchair,
} from "lucide-react";
import RoomSlider from "./room-slider";
import { useTranslation } from "react-i18next";

const categories = [
  { label: "Korpusi", value: "closet", icon: <Archive size={18} /> },
  { label: "Stolovi", value: "table", icon: <Table2 size={18} /> },
  { label: "Kauči", value: "couch", icon: <LayoutGrid size={18} /> },
  { label: "Kreveti", value: "bed", icon: <Bed size={18} /> },
  { label: "Noćni ormarići", value: "nightstand", icon: <Box size={18} /> },
  { label: "Stolice", value: "chair", icon: <Armchair size={18} /> },
  { label: "Svjetla", value: "lamp", icon: <LampDesk size={18} /> },
];

interface ModelSidebarProps {
  onModelSelect: (model: {
    model_url: string;
    price: number;
    category: string;
  }) => void;
  showRoomControls?: boolean;
}

export default function ModelSidebar({
  onModelSelect,
  showRoomControls,
}: ModelSidebarProps) {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: models, isLoading } = useFetchModels(
    selectedCategory || undefined
  );

  const placedModels = useModelStore((s) => s.models);
  const totalPrice = placedModels.reduce((sum, m) => sum + (m.price || 0), 0);

  return (
    <aside className="w-[340px] bg-white border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 shadow-md">
        <div className="text-2xl font-semibold text-black">{totalPrice} €</div>
        <Menu className="text-gray-700" size={20} />
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        {showRoomControls ? (
          <>
            <h2 className="text-lg font-bold text-gray-800">
              {t("sidebar.customizeRoom")}
            </h2>
            <RoomSlider />
          </>
        ) : !selectedCategory ? (
          <>
            <h1 className="text-black font-bold text-xl">
              {t("sidebar.whatToCustomize")}
            </h1>

            <div className="space-y-5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="flex items-center justify-between w-full py-3 border-b hover:bg-gray-50 transition text-left"
                >
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                    {cat.icon}
                    {t(`categories.${cat.value}`)}
                  </div>
                  <ChevronRight className="text-gray-400 w-4 h-4" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 mb-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 rotate-180 text-black" />
              </div>
              <span className="text-black font-semibold text-xl">
                {t(`categories.${selectedCategory}`)}
              </span>
            </div>

            <h2 className="text-lg font-semibold mb-4">
              {t("sidebar.modelsForCategory")}:{" "}
              {t(`categories.${selectedCategory}`)}
            </h2>

            {isLoading && (
              <p className="text-sm text-gray-500">{t("sidebar.loading")}</p>
            )}

            {models?.length === 0 && (
              <p className="text-sm text-gray-500">{t("sidebar.noModels")}</p>
            )}

            <div className="space-y-4 pr-2">
              {models?.map((model) => {
                const isPlaced = placedModels.some(
                  (m) => m.url === model.model_url
                );

                return (
                  <div
                    key={model.id}
                    onClick={() =>
                      onModelSelect({
                        model_url: model.model_url,
                        price: model.price,
                        category: model.category,
                      })
                    }
                    className="relative border p-3 transition-all cursor-pointer group hover:shadow-md hover:-translate-y-1"
                  >
                    <img
                      src={model.image_url}
                      alt={model.name}
                      className="rounded-md w-full h-32 object-contain"
                    />
                    {isPlaced && (
                      <div className="absolute top-2 right-2 bg-black rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="mt-2 font-medium text-black text-sm">
                      {model.name}
                    </div>
                    <div className="text-sm text-gray-500 font-bold">
                      {model.price} €
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
