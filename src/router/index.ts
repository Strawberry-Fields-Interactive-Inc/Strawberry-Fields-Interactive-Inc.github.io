import { AccessLevel } from './../enums/AccessLevel';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Upload from '../views/Upload.vue';
import CreateAccount from '../views/CreateAccount.vue';
import  Store from '@/store';// path to store file

const authorize = {
  ALL : [],
  LOGUED : [AccessLevel.ADM,AccessLevel.EDITOR,AccessLevel.SUBSCRIBER,AccessLevel.USER],
  ADM : [AccessLevel.ADM]
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authorize:authorize.ALL } 
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { authorize:[] } 
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    component: CreateAccount,
    meta: { authorize:authorize.ALL } 
  },  
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: { authorize:authorize.LOGUED } 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { authorize:authorize.ALL } 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const { authorize } = to.meta;
  const authorizeArr :Array<number> = authorize as Array<number> ;

  if(authorizeArr.length > 0)
  {
    //TODO: Need check accesslevel and not only if is logged
    if(!Store.getters["auth/isLogged"])
    {
      return next({path:'/'}); 
    } 
  } 

  return next();
});

export default router
