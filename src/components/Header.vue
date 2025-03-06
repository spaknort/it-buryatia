<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <Logo />
                <Menu :color_is_dark="false" />
                <div class="header__buttons">
                    <router-link to="/admin/editProfile" class="btn btn-primary">Изменить</router-link>
                    <button class="btn" :class="is_logged ? 'btn-danger': 'btn-primary'" @click="loginButtonHandler()">
                        {{ authStore.isLogged ? 'Выйти': 'Войти' }}
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { ref } from "vue";
    import { useAuthStore } from "@/store/authStore";
    import { useRouter } from "vue-router";
    import {getRoutes} from "@/helpers/getRoutes";
    import Menu from "@/components/Menu.vue";

    const authStore = useAuthStore()
    const router = useRouter()


    function loginButtonHandler () {
        if (authStore.isLogged) {
            authStore.logout()
            router.push({ path: '/' })
        }
        else router.push({ path: '/login' })
    }
</script>

<style lang="css" scoped>
    .header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100%;
        background-color: #0b3f71;
    }

    .header__inner {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
    }

    .header__buttons {
        display: flex;
        align-items: center;
        column-gap: 12px;
    }
</style>