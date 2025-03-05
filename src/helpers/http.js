import axios from 'axios';
import {useAuthStore} from "@/store/authStore";
import {useRouter} from "vue-router";

const token = localStorage.getItem('my-token') || '';

console.log(localStorage, ' - re')

const $api = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": 'application/json',
        'Accept':' application/json',
        "Authorization": `Bearer ${token}`
    }
})

$api.interceptors.response.use((response) => response, async (error) => {
    const authStore = useAuthStore()
    const router = useRouter()

    if (error.status === 401) {
        // authStore.logout()
        await router.push({ path: '/login' })
    }

    console.log(error, ' interceptors error');
})

export default $api