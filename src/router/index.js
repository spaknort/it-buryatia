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
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            if (!authStore.getLogged) next('/login')
            else next()
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
        ]
    }
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})