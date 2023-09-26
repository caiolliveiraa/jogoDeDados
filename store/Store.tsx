import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o tipo de objeto que representa um resultado de jogada
type GameResult = {
  dado1: number;
  dado2: number;
  resultado: string;
};

// Definindo o tipo de estado da loja Zustand
type Store = {
  history: GameResult[];
  addToHistory: (result: GameResult) => Promise<void>;
};

const useStore = create<Store>((set) => ({
  history: [],
  addToHistory: async (result) => {
    set((state) => {
      const newHistory = [...state.history, result];

      try {
        // Salvando o histórico no AsyncStorage
        AsyncStorage.setItem('history', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Erro ao salvar o histórico:', error);
      }

      return { history: newHistory };
    });
  },
}));


export default useStore; 