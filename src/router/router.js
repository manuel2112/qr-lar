import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { 
        path: '/:slug',
        name: 'home',
        component: () => import(/* webpackChunkName: "HomePage" */ '@/modules/home/pages/HomePage'),
        props: ( route ) => {
            const { slug } = route.params;
            return { slug };
        }
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound') 
    },
  ]


  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })  

  export default router