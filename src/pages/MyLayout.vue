<template>
    <Header/>
    <main>
        <router-view></router-view>
    </main>
    <Footer />
</template>

<script setup>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
</script>