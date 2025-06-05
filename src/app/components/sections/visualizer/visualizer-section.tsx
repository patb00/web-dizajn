"use client";

import VisualizerCanvas from "./components/viusalizer-component";
import ModelSidebar from "./components/model-sidebar";
import { useModelStore } from "./store/model-store";
import { Trash2, RotateCcw, Moon, Sun, Check, SquarePen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function VisualizerSection() {
  const { t } = useTranslation();
  const addModel = useModelStore((s) => s.addModel);
  const models = useModelStore((s) => s.models);
  const setSelectedIndex = useModelStore((s) => s.setSelectedIndex);
  const selectedIndex = useModelStore((s) => s.selectedIndex);
  const deleteModel = useModelStore((s) => s.deleteModel);
  const rotateModelY = useModelStore((s) => s.rotateModelY);

  const [lightsOn, setLightsOn] = useState(true);
  const [showRoomControls, setShowRoomControls] = useState(false);

  const handleModelSelect = (model: {
    model_url: string;
    price: number;
    category: string;
  }) => {
    const newPosition: [number, number, number] = [0, 0, 0];
    const newRotation: [number, number, number] = [0, 0, 0];

    addModel({
      url: model.model_url,
      price: model.price,
      category: model.category,
      position: newPosition,
      rotation: newRotation,
    });

    setSelectedIndex(models.length);
  };

  console.log("models", models);

  return (
    <section
      className="h-screen bg-[#f5f5f5] flex overflow-hidden relative"
      id="visualizer"
    >
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-[80%] h-full flex items-center justify-center relative">
          <VisualizerCanvas lightsOn={lightsOn} />
        </div>

        {selectedIndex !== null && models[selectedIndex] && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-md border px-4 py-2 flex items-center gap-4 z-10">
            {/*             <div className="text-sm font-medium text-gray-700 text-center">
              {models[selectedIndex].url.split("/").pop()?.replace(".glb", "")}
            </div> */}
            <button
              onClick={() => deleteModel(selectedIndex)}
              className="text-red-500 hover:text-red-700"
              title={t("visualizer.delete")}
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => {
                console.log("%c[Button] Rotate clicked", "color: blue;");
                rotateModelY(selectedIndex, Math.PI / 2);
              }}
              className="text-blue-500 hover:text-blue-700"
              title={t("visualizer.rotate")}
            >
              <RotateCcw size={20} />
            </button>
          </div>
        )}

        <button
          onClick={() => setLightsOn((prev: any) => !prev)}
          className="absolute bottom-6 left-6 z-10 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100"
          title={t("visualizer.toggleLights")}
        >
          {lightsOn ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => setShowRoomControls((prev) => !prev)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black text-white text-sm flex items-center gap-2 hover:opacity-90 transition font-semibold"
        >
          {showRoomControls ? <Check size={16} /> : <SquarePen size={16} />}
          {showRoomControls
            ? t("visualizer.done")
            : t("visualizer.customizeRoom")}
        </button>
      </div>

      <div className="w-[20%] h-full">
        <ModelSidebar
          onModelSelect={handleModelSelect}
          showRoomControls={showRoomControls}
        />
      </div>
    </section>
  );
}
