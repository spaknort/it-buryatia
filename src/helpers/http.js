import axios from 'axios';
import {useAuthStore} from "@/store/authStore";
import {useRouter} from "vue-router";

const token = localStorage.getItem('my-token') || '';

const $api = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": 'application/json',
        'Accept':' application/json',
        "Authorization": `Bearer ${token}`
    }
})

const $api2 = axios.create({
    baseURL: 'https://webcomp.bsu.ru/api/2025',
    headers: {
        "Content-Type": 'application/json',
        'Accept':' application/json',
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': true
    },
})

const errorFunction = async (error) => {
    const authStore = useAuthStore()
    const router = useRouter()

    if (error.status === 401) {
        // authStore.logout()
        await router.push({ path: '/login' })
    }

    console.log(error, ' interceptors error');
}

$api.interceptors.response.use((response) => response, errorFunction)
$api2.interceptors.response.use((response) => response, errorFunction)

export {$api, $api2}