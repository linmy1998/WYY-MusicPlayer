import Vue from 'vue'
import VueRouter from 'vue-router'

const Home= () => import('../views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // children:[
    //   {
    //     path:'/home/discover',
    //     component: Discover
    //   },
    //   {
    //     path:'/home/allmv',
    //     component: AllMv
    //   }
    // ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router