import {defineStore} from "pinia"
import axios from "axios"

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        isLogged: localStorage.getItem('is-logged'),
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
            const headers = {
                'Accept':' application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.token
            }
            try {
                const response = await axios.get('https://webcomp.bsu.ru/api/userData', { headers })
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