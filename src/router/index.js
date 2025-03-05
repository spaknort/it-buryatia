import * as VueRouter from 'vue-router'
import MainPage from '../pages/MainPage'
import AboutPage from '../pages/AboutPage'
import ProjectPage from '../pages/ProjectPage'
import LoginPage from '../pages/LoginPage'
import MyLayout from '../pages/MyLayout'
import AdminCabinet from '../pages/admin/AdminCabinet'
import EditProfile from '../pages/admin/EditProfile'
import { useAuthStore } from '@/store/authStore'
import ProjectsPage from "@/pages/ProjectsPage.vue";
import ContactsPage from "@/pages/ContactsPage.vue";
import AdvertisingPage from "@/pages/AdvertisingPage.vue";
import AuctionPage from "@/pages/AuctionPage.vue";
import BettingHistoryPageByProject from "@/pages/BettingHistoryPageByProject.vue";
import MyBetting from "@/pages/MyBetting.vue";

const routes = [
    {
        path: '/',
        name: 'myLayout',
        component: MyLayout,
        children: [
            {
                path: '',
                name: 'mainPage',
                component: MainPage
            },
            {
                path: '/about',
                name: 'aboutPage',
                component: AboutPage
            },
            {
                path: '/project/:id',
                name: 'projectPage',
                component: ProjectPage
            },
            {
                path: '/projects',
                name: 'projectsPage',
                component: ProjectsPage
            },
            {
                path: '/contacts',
                name: 'contactsPage',
                component: ContactsPage
            },
            {
                path: '/advertising',
                name: 'advertisingPage',
                component: AdvertisingPage
            },
            {
                path: '/auction',
                name: 'auctionPage',
                component: AuctionPage,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/betting-history/:id',
                name: 'bettingHistoryPageByProject',
                component: BettingHistoryPageByProject,
            }
        ]
    },
    {
        path: '/login',
        name: 'loginPage',
        component: LoginPage
    },
    {
        path: '/admin',
        name: 'adminLayout',
        component: MyLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'cabinet',
                component: AdminCabinet
            },
            {
                path: 'editProfile',
                name: 'edit',
                component: EditProfile
            },
            {
                path: 'betting',
                name: 'myBetting',
                component: MyBetting
            }
        ]
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLogged) next('/login')
    else next()
})

export default router