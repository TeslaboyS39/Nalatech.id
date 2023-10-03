import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import RegisterPageOwner from '../views/RegisterPageOwner.vue'
import RegisterPageMitra from '../views/RegisterPageMitra.vue'
import LoginPageOwner from '../views/LoginPageOwner.vue'
import LoginPageMitra from '../views/LoginPageMitra.vue'
import AboutPage from '../views/AboutPage.vue'
import MitrasPage from '../views/MitrasPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import AddProjectPage from '../views/AddProjectPage.vue'
import ContractsPage from '../views/ContractsPage.vue'
import TransactionFormPage from '../views/TransactionFormPage.vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/registerOwner',
      name: 'registerOwner',
      component: RegisterPageOwner
    },
    {
      path: '/registerMitra',
      name: 'registerMitra',
      component: RegisterPageMitra
    },
    {
      path: '/loginOwner',
      name: 'loginOwner',
      component: LoginPageOwner
    },
    {
      path: '/loginMitra',
      name: 'loginMitra',
      component: LoginPageMitra
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/mitras',
      name: 'mitras',
      component: MitrasPage
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage
    },
    {
      path: '/addProject',
      name: 'addProject',
      component: AddProjectPage
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: ContractsPage
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionFormPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token

  if (!isAuthenticated && (to.path !== '/' && to.path !== '/loginOwner' && to.path !== '/registerOwner' && to.path !== '/loginMitra' && to.path !== '/registerMitra')) {
    next({ name: 'landing' })
  } else {
    next()
  }
})

export default router
