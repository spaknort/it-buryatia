<template>
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src="/img/BSU_logo.svg" alt="" width="36" height="36">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li v-for="(item, index) in menuItems" :key="index">
                        <router-link :to="{ path: item.link }" class="nav-link px-2 text-white">{{ item.title }}</router-link>
                    </li>
                </ul>

                <div class="text-end d-flex gap-2">
                    <router-link to="/admin/editProfile" class="btn me-1 btn-primary">Изменить</router-link>
                    <button class="btn me-2" :class="is_logged?'btn-danger':'btn-primary'" @click="loginButtonHandler()">
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

    const authStore = useAuthStore()
    const router = useRouter()

    const menuItems = ref([
        {'link': '/', 'title': 'Главная'},
        {'link': '/about', 'title': 'О нас'},
        {'link': '/projects', 'title': 'Список проектов'},
        {'link': '/contacts', 'title': 'Контакты'},
    ])

    if (authStore.isLogged) menuItems.value.push({ link: '/admin', title: 'Личный кабинет' })

    function loginButtonHandler () {
        if (authStore.isLogged) {
            authStore.logout()
            router.push({ path: '/' })
        }
        else router.push({ path: '/login' })
    }
</script>