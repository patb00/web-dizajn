"use client";
import { useTranslation } from "react-i18next";
import { useModelStore } from "../store/model-store";

export default function RoomSlider() {
  const { t } = useTranslation();
  const { width, depth, height } = useModelStore((s) => s.roomSize);
  const setRoomSize = useModelStore((s) => s.setRoomSize);

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        {t("room.width")}: {width}m
      </label>
      <input
        type="range"
        min={5}
        max={20}
        value={width}
        onChange={(e) => setRoomSize({ width: parseFloat(e.target.value) })}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">
        {t("room.depth")}: {depth}m
      </label>
      <input
        type="range"
        min={5}
        max={20}
        value={depth}
        onChange={(e) => setRoomSize({ depth: parseFloat(e.target.value) })}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">
        {t("room.height")}: {height}m
      </label>
      <input
        type="range"
        min={2}
        max={6}
        value={height}
        onChange={(e) => setRoomSize({ height: parseFloat(e.target.value) })}
        className="w-full"
      />
    </>
  );
}
