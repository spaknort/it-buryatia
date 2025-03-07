<template>
    <main class="admin-cabinet">
        <div class="container d-flex flex-column gap-5">
            <div class="row">
                <div class="col-12">
                    <h1>Личный кабинет администратора</h1>
                </div>
                <div class="col-5">                    
                    <UserInfo :userInfo="userInfo"/>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-danger" @click="logout()">Выйти</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import UserInfo from '@/components/admin/UserInfo.vue'
    import {onMounted, ref} from "vue";
    import {useAuthStore} from "@/store/authStore";
    import {useRouter} from "vue-router";

    const authStore = useAuthStore()
    const router = useRouter()
    const userInfo = ref({})

    async function logout() {
        authStore.logout()
        await router.push({ path: '/' })
    }

    onMounted(async () => {
        userInfo.value = await authStore.getUserData()
    })
</script>

<style lang="css" scoped>
    .admin-cabinet {
        margin-top: 118px;
    }
</style>