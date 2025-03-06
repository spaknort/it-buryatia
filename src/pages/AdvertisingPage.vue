<script setup>
    import {useAuthStore} from "@/store/authStore";
    import {onBeforeMount, ref} from "vue";
    import {getBetting} from "@/helpers/getBetting";

    const authStore = useAuthStore()
    const bettingRef = ref([])

    onBeforeMount(async () => {
        bettingRef.value = await getBetting(-1, 5)
    })
</script>

<template>
    <div class="advertising">
        <div class="container">
            <h3 class="title">
                Уважаемый посетители вы можете поучаствовать в аукционе проектов. Для этого пройдите по ссылке ниже. Внимание: участие только для авторизованных пользователей.
            </h3>
            <img class="advertising__image" v-if="!authStore.isLogged" src="/img/banner.avif" alt="Banner">
            <table v-else class="advertising__table table">
                <thead>
                   <tr>
                       <th scope="col">#</th>
                       <th scope="col">Проект</th>
                       <th scope="col">Размер ставки</th>
                       <th scope="col">Дата</th>
                       <th scope="col">Время</th>
                       <th scope="col">Кто поставил</th>
                   </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bettingRef">
                        <td scope="row">{{ bet.id }}</td>
                        <td>{{ bet.projectName }}</td>
                        <td>{{ bet.amount }}</td>
                        <td>{{ bet.date }}</td>
                        <td>{{ bet.time }}</td>
                        <td>{{ bet.userName }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="advertising__buttons">
                <router-link to="/auction" v-show="authStore.isLogged" class="btn btn-info">Посмотреть аукцион</router-link>
                <router-link to="/login" v-show="!authStore.isLogged" class="btn btn-info">Войти</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .advertising {
        margin-top: 118px;
    }

    .advertising__image,
    .advertising__table {
        margin-top: 32px;
    }

    .advertising__buttons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin: 0 auto;
    }
</style>