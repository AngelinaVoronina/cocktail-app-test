<template>
  <div class="cocktail-page">
    <div v-if="store.isLoading(cocktailCode)">Loading...</div>
    <div v-else-if="store.getError(cocktailCode)">Error: {{ store.getError(cocktailCode) }}</div>
    <template v-else>
      <h1>Cocktails: {{ cocktailCode }}</h1>
      <div class="cocktail-page__grid">
        <cocktail-card
          v-for="cocktail in store.getCocktails(cocktailCode)"
          :key="cocktail.idDrink"
          :cocktail="cocktail"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, watch} from 'vue';
  import {useCocktailStore} from '@/store/cocktails.ts';
  import CocktailCard from '@/components/CocktailCard.vue';

  interface Props {
    cocktailCode: string;
  }

  const props = defineProps<Props>();

  const store = useCocktailStore();

  onMounted(() => {
    store.fetchCocktails(props.cocktailCode);
  });

  watch(
    () => props.cocktailCode,
    (newCode) => {
      store.fetchCocktails(newCode);
    },
  );
</script>

<style scoped lang="scss">
  .cocktail-page {
    padding: 20px;

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .cocktail-page__grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
</style>
