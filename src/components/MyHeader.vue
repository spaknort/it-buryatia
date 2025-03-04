<template>
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src="/img/BSU_logo.svg" alt="" width="36" height="36">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li v-for="(item, index) in menuItems" :key="index">
                        <router-link v-if="!item.link.includes('/admin')" :to="{ path: item.link }" class="nav-link px-2 text-white">{{ item.title }}</router-link>
                    </li>
                    <li v-if="authStore.isLogged" class="dropdown show">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Профиль
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <router-link class="dropdown-item" to="/admin">Личный кабинет</router-link>
                            <router-link class="dropdown-item" to="/editProfile">Редактировать профиль</router-link>
                        </div>
                    </li>
                </ul>

                <div class="text-end">
                    <button type="button" class="btn me-2" :class="is_logged?'btn-danger':'btn-primary'" @click="loginButtonHandler()">
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

    function loginButtonHandler () {
        if (authStore.isLogged) {
            authStore.logout()
            router.push({ path: '/' })
        }
        else router.push({ path: '/login' })
    }
</script>