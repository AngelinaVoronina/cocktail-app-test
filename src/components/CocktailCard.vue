<template>
  <div class="cocktail-card">
    <img
      :src="cocktail.strDrinkThumb"
      :alt="cocktail.strDrink"
      loading="lazy"
    />
    <h2>{{ cocktail.strDrink }}</h2>
    <div><strong>Category: </strong>{{ cocktail.strCategory }}</div>
    <div>
      <strong>{{ cocktail.strAlcoholic }}</strong>
    </div>
    <div>
      <strong>{{ cocktail.strGlass }}</strong>
    </div>
    <div><strong>Instructions:</strong> {{ cocktail.strInstructions }}</div>
    <ul>
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
      >
        {{ ingredient }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import {computed} from 'vue';
  import type {ICocktail} from '@/types/cocktail';
  interface Props {
    cocktail: ICocktail;
  }

  const props = defineProps<Props>();

  const getIngredients = (drink: ICocktail) => {
    const ingredients = [];
    let index = 1;
    while (true) {
      const ingredient = drink[`strIngredient${index}`];
      const measure = drink[`strMeasure${index}`];
      if (!ingredient) {
        break;
      }
      ingredients.push(measure && measure.trim() ? `${ingredient.trim()} — ${measure.trim()}` : ingredient.trim());
      index++;
    }
    return ingredients;
  };

  const ingredients = computed(() => getIngredients(props.cocktail));
</script>

<style scoped lang="scss">
  .cocktail-card {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    img {
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
    }

    ul {
      padding-left: 1.2rem;
    }
  }
</style>
