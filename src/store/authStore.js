import {defineStore} from "pinia"
import {$api} from "@/helpers/http";
import axios from "axios";

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        isLogged: Boolean(localStorage.getItem('is-logged')),
        token: localStorage.getItem('my-token'),
    }),
    actions: {
        async login(payload) {
            const data = {
                email: payload.login,
                password: payload.password,
                device_name: "myVueTest",
            }
            const headers = { "Content-Type": 'application/json' }
            const result = await axios.post('https://webcomp.bsu.ru/sanctum/token', data, { headers })

            if (result.status === 200) {
                this.isLogged = true; this.token = result.data
                localStorage.setItem('is-logged', 'true'); localStorage.setItem('my-token', result.data)
            }
            else {
                this.isLogged = false; this.token = ''
                localStorage.setItem('is-logged', ''); localStorage.setItem('my-token', '')
            }

            return result
        },
        async getUserData() {

            try {
                const response = await $api.get('https://webcomp.bsu.ru/api/userData')
                return response.data['data']
            }
            catch (e) {
                alert(e.message)
                console.log(e)
            }
        },
        logout() {
            this.isLogged = false; this.token = ''
            localStorage.setItem('is-logged', ''); localStorage.setItem('my-token', '')
        },
    },
    getters: {
        getLogged(state) { return state.isLogged },
        getToken(state) { return state.token },
    },
})