import { create } from "zustand";

interface Model {
  url: string;
  category: string;
  position: [number, number, number];
  rotation: [number, number, number];
  price: number;
}

interface RoomSize {
  width: number;
  depth: number;
  height: number;
}

interface ModelStore {
  models: Model[];
  selectedIndex: number | null;
  roomSize: RoomSize;
  addModel: (model: Model) => void;
  updateModelPosition: (index: number, pos: [number, number, number]) => void;
  setSelectedIndex: (index: number | null) => void;
  deleteModel: (index: number) => void;
  rotateModelY: (index: number, angle: number) => void;
  setRoomSize: (size: Partial<RoomSize>) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  selectedIndex: null,

  roomSize: {
    width: 10,
    depth: 10,
    height: 4,
  },

  addModel: (model) =>
    set((state) => ({
      models: [
        ...state.models,
        {
          ...model,
          rotation: model.rotation ?? [0, 0, 0],
        },
      ],
    })),

  updateModelPosition: (index, pos) =>
    set((state) => {
      const models = [...state.models];
      models[index] = { ...models[index], position: pos };
      return { models };
    }),

  setSelectedIndex: (index) => set({ selectedIndex: index }),

  deleteModel: (index) =>
    set((state) => {
      const updatedModels = state.models.filter((_, i) => i !== index);
      let newSelectedIndex = state.selectedIndex;
      if (newSelectedIndex === index) newSelectedIndex = null;
      else if (newSelectedIndex !== null && newSelectedIndex > index)
        newSelectedIndex -= 1;

      return { models: updatedModels, selectedIndex: newSelectedIndex };
    }),

  rotateModelY: (index, angle) =>
    set((state) => {
      const models = [...state.models];
      const model = models[index];
      if (!model) return { models };

      const rotation: [number, number, number] = [...model.rotation];
      rotation[1] = (rotation[1] + angle) % (Math.PI * 2);
      models[index] = { ...model, rotation };

      console.log(
        "[rotateModelY] index:",
        index,
        "angle:",
        angle,
        "newRotation:",
        rotation
      );
      return { models };
    }),

  setRoomSize: (size) =>
    set((state) => ({
      roomSize: {
        ...state.roomSize,
        ...size,
      },
    })),
}));
