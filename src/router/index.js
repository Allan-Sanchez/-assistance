import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        requiresInvited:true
      }
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        requiresGuest:true
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      meta:{
        requiresGuest:true
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
    },
    {
      path: '*',
      meta:{
        requiresInvited:true
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/page404.vue')
    }
  ]
  
});

//nav guards
router.beforeEach((to,from,next) => {
  // check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check i not logged in
    if (!firebase.auth().currentUser) {
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
       // check i not logged in
    if (firebase.auth().currentUser) {
      next({
        path:'/dashboard',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      // proceed to route
      next();
    }
  }else{
    // proceed to route
    next();
  }
});

export default router;