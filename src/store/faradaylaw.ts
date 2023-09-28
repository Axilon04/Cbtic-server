import { create } from 'zustand';

type TState = {
  stop: boolean;
  frequency: number;
  femInd: number;
  area: number;
  intensityVectors: number;
};

type TActions = {
  stopInteraction: () => void;
  updateFrequency: (frequency: number) => void;
  updateArea: (area: number) => void;
  updatefemInd: (femInd: number) => void;
};

const useFaradayLaw = create<TState & TActions>(set => ({
  stop: false,
  frequency: 0.2,
  femInd: 0,
  area: 1,
  intensityVectors: 5,
  stopInteraction: () => {
    set(state => ({ stop: !state.stop }));
  },
  updateFrequency: (frequency: number) => {
    set({ frequency });
  },
  updateArea: (area: number) => {
    set({ area });
  },
  updatefemInd: (femInd: number) => {
    set({ femInd });
  },
}));

export default useFaradayLaw;
