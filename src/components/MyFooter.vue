<template>
    <footer class="footer">
        <ul class="nav d-flex justify-content-center border-bottom gap-3">
            <li v-for="(item, index) in menuItems" :key="index">
                <router-link :to="item.link" class="footer_link">{{ item.title }}</router-link>
            </li>
        </ul>
        <p class="text-center text-body-secondary">
            <slot></slot>
        </p>
    </footer>
</template>

<script setup>
    import {ref} from "vue";

    const menuItems = ref([
        {'link': '/', 'title': 'Главная'},
        {'link': '/about', 'title': 'О нас'},
        {'link': '/projects', 'title': 'Список проектов'},
        {'link': '/contacts', 'title': 'Контакты'},
    ])
</script>

<style scoped lang="css">
    .footer_link {
        text-decoration: none;
        color: gray;
    }
</style>