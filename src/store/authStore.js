import {defineStore} from "pinia"
import {$api} from "@/helpers/http";
import axios from "axios";

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        isLogged: Boolean(localStorage.getItem('is-logged')),
        token: localStorage.getItem('my-token'),
        userData: JSON.parse(localStorage.getItem('user-data') || JSON.stringify({ user_id: -1 })),
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
                await this.getUserData()
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
                localStorage.setItem('user-data', JSON.stringify(response.data['data']))

                return response.data['data']
            }
            catch (e) {
                console.log(e, ' - user data error in auth store')
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