<template>
    <main>
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
    import axios from 'axios'
    import {onMounted, ref} from "vue";
    import {useAuthStore} from "@/store/authStore";
    import {useRouter} from "vue-router";

    const authStore = useAuthStore()
    const router = useRouter()
    const userInfo = ref({})

    async function getUserData() {
        const headers = {
            'Accept':'application/json',
            'content-type':'application/json',
            'Authorization':'Bearer ' + authStore.token
        }

        try {
            const response = await axios.get('https://webcomp.bsu.ru/api/userData', { headers })
            userInfo.value = response.data['data']
        }
        catch (e) {
            alert(e.message)
            console.log(e)
        }
    }

    async function logout() {
        authStore.logout()
        await router.push({ path: '/' })
    }

    onMounted(() => {
        getUserData()
    })
</script>