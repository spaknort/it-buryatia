<template>
    <footer class="footer">
        <ul class="nav d-flex justify-content-center border-bottom gap-3">
            <li class="nav-item">
                <a href="/" class="nav-link px-2 text-body-secondary">Главная</a>
            </li>
            <li class="nav-item">
                <a href="about.html" class="nav-link px-2 text-body-secondary">О нас</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link px-2 text-body-secondary">Список проектов</a>
            </li>
            <li class="nav-item">
                <a href="login.html" class="nav-link px-2 text-body-secondary">Войти</a>
            </li>
        </ul>
        <p class="text-center text-body-secondary">
            <slot></slot>
        </p>
    </footer>
</template>

<script setup>

</script>