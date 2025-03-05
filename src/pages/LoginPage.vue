<template>
	<LoginForm v-model:login="login" v-model:password="password" @sendData="sendData()"/>
</template>

<script setup>
    import LoginForm from '../components/forms/LoginForm.vue'
    import {onBeforeMount, ref} from "vue";
    import {useAuthStore} from "@/store/authStore";
    import {useRouter} from "vue-router";

    const authStore = useAuthStore()
    const router = useRouter()

    const login = ref('')
    const password = ref('')

    onBeforeMount(() => {
        document.body.className='text-center'
        document.getElementById("app").style.width="100%"
    })

    async function sendData() {
        try {
            const response = await authStore.login({
                login: login.value,
                password: password.value
            })

            if (response.status === 200) window.location.href = '/admin'
        }
        catch (e) {
            alert("Неправильный логин или пароль")
            console.log(e)
        }
    }
</script>

<style scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>