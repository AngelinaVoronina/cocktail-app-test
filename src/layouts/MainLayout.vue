<template>
  <div class="layout">
    <aside :class="['sidebar', {open: isOpen}]">
      <div class="sidebar__close-wrapper">
        <button
          class="sidebar__close"
          @click="closeMenu"
        >
          &#10005;
        </button>
      </div>
      <nav class="sidebar__nav">
        <router-link
          v-for="code in cocktailCodes"
          :key="code"
          :to="`/${code}`"
          class="sidebar__item"
          :class="{active: route.path === `/${code}`}"
          @click="handleMenuClick"
        >
          {{ code }}
        </router-link>
      </nav>
    </aside>
    <div class="main">
      <header class="header">
        <button
          class="header__burger"
          @click="toggleMenu"
        >
          &#9776;
        </button>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';
  import {cocktailCodes} from '@/constants/cocktails';

  const route = useRoute();

  const isOpen = ref<boolean>(false);

  const toggleMenu = () => (isOpen.value = !isOpen.value);
  const closeMenu = () => (isOpen.value = false);

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  };
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 220px;
    background-color: #f5f5f5;
    color: white;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transition: transform 0.3s ease-in-out;

    &__close-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }

    &__close {
      display: none;
      font-size: 1.5rem;
      background: none;
      border: none;
      color: #000000;
      cursor: pointer;
      text-align: end;
      padding: 0 1rem;
    }

    &__nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &__item {
      text-transform: capitalize;
      text-decoration: none;
      color: #333;
      padding: 1rem;
      border-radius: 8px;
      text-align: left;

      &:hover {
        background-color: #e0f3ea;
        color: #2c8e68;
      }

      &.active {
        font-weight: bold;
        background-color: #e0f3ea;
        color: #2c8e68;
      }
    }
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .header {
    display: none;
    background-color: #f5f5f5;
    padding: 1rem;

    &__burger {
      font-size: 1.5rem;
      background: none;
      border: none;
      color: #000000;
      cursor: pointer;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 100;
      transform: translateX(-100%);

      &__close {
        display: block;
      }

      &.open {
        transform: translateX(0);
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
</style>
