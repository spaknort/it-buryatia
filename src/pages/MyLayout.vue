<template>
    <div class="overflow-hidden">
        <MyHeader/>
        <main>
            <router-view></router-view>
        </main>
        <MyFooter>{{ currentYear }} Мы будущее ИТ Бурятии</MyFooter>
    </div>
</template>

<script setup>
    import MyFooter from '@/components/MyFooter.vue'
    import MyHeader from '@/components/MyHeader.vue'

    const currentYear = new Date().getFullYear()
</script>