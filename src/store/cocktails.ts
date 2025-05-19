import {defineStore} from 'pinia';
import axios, {type AxiosError} from 'axios';
import type {ICocktail} from '@/types/cocktail';

export const useCocktailStore = defineStore('cocktails', {
  state: () => ({
    cocktails: {} as Record<string, ICocktail[]>,
    loadingCodes: new Set<string>(),
    errorCodes: {} as Record<string, string>,
  }),

  getters: {
    isLoading: (state) => (code: string) => state.loadingCodes.has(code),
    getError: (state) => (code: string) => state.errorCodes[code] || null,
    getCocktails: (state) => (code: string) => state.cocktails[code] || [],
  },

  actions: {
    async fetchCocktails(code: string) {
      if (this.cocktails[code]) return;

      this.loadingCodes.add(code);
      delete this.errorCodes[code];

      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`);
        this.cocktails[code] = response.data.drinks || [];
      } catch (err: unknown) {
        const error = err as AxiosError;
        this.errorCodes[code] = 'Data upload error';
        console.error(error);
      } finally {
        this.loadingCodes.delete(code);
      }
    },
  },
});
