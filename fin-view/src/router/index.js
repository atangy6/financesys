import { createRouter, createWebHistory } from 'vue-router'
import MainVue from '@/views/Main.vue'
const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    component: MainVue,
    children: [
      {
        path: "",
        component: () => import("../views/home/Home.vue")
      },
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue")
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: () => import("../views/home/InfoShow.vue")
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: () => import("../views/fundlist/FundList.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/Login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/register/Register.vue")
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notfound',
    component: () => import("../views/NotFound.vue")
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.mytoken ? true : false

  if (to.path == "/login" || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
