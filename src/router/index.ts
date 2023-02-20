import { characterRoute } from '@/characters/router';
import AboutPage from '@/shared/pages/AboutPage.vue'
import HomePage from '@/shared/pages/HomePage.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            name:'home',
            component: HomePage
        },
        {
            path:'/about',
            name:'about',
            component: AboutPage
        },
        characterRoute,
        {
            path: '/:pathMatch(.*)*',
            redirect: ()=>({name:'home'})
        }
    ]
})

export default router;