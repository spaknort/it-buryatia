<template>
    <main class="edit-profile">
        <div class="container d-flex flex-column gap-5">
            <div class="row">
                <div class="col-12">
                    <h1>Редактирование профиля</h1>
                </div>
                <div class="col-5">
                    <UserDataForm :userInfo="userInfo"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import UserDataForm from '@/components/forms/UserDataForm.vue';
    import {useAuthStore} from "@/store/authStore";
    import {onBeforeMount, ref} from "vue";

    const authStore = useAuthStore()
    const userInfo = ref({})

    onBeforeMount(async () => {
        userInfo.value = await authStore.getUserData()
    })
</script>

<style lang="css" scoped>
    .edit-profile {
        margin-top: 118px;
    }
</style>