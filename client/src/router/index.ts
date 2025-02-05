import AboutPage from '../views/AboutPage.vue'
import HeroView from '../views/HeroesPage.vue'
import HomeView from '../views/HomePage.vue'
import ItemsView from '../views/ItemsPage.vue'
import MatchesView from '../views/MatchesPage.vue'
import SearchPage from '../views/SearchPage.vue'
import PlayerView from '../views/TopPlayersPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView }, // Homepage
  { path: '/heroes', component: HeroView }, // Heroes Page
  { path: '/players', component: PlayerView }, // Players Page
  { path: '/items', component: ItemsView }, // Items Page
  { path: '/matches', component: MatchesView }, // Matches Page
  { path: '/about', component: AboutPage },
  { path: '/search', component: SearchPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use the correct property
  routes,
})

export default router
