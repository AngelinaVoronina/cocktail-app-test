import {createRouter, createWebHistory} from 'vue-router';
import {cocktailCodes} from '@/constants/cocktails';
import MainLayout from '@/layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: `/${cocktailCodes[0]}`,
      },
      ...cocktailCodes.map((code: string) => ({
        path: `${code}`,
        name: code,
        component: () => import('@/pages/CocktailPage.vue'),
        props: {
          cocktailCode: code,
        },
      })),
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
