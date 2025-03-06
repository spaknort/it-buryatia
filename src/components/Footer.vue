<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                <Menu :color_is_dark="true" />
                <p class="text-center text-body-secondary">
                    {{ currentYear }} Мы будущее ИТ Бурятии
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
    import Menu from "@/components/Menu.vue";

    const currentYear = new Date().getFullYear()
</script>

<style scoped lang="css">
    .footer {
        width: 100%;
        margin-top: 48px;
    }

    .footer__inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
</style>