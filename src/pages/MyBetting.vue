<template>
    <div class="myBettings">
        <div class="container">
            <h3 class="title"> Мои ставки </h3>
            <img class="myBettings__image" v-if="!authStore.isLogged" src="/img/banner.avif" alt="Banner">
            <table v-else class="myBettings_table table">
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
                <tr v-for="bet in bettingRef" :class="(maxBets.includes(bet.id)) ? 'active_tr': ''" >
                    <td scope="row">{{ bet.id }}</td>
                    <td>{{ bet.projectName }}</td>
                    <td>{{ bet.amount }}</td>
                    <td>{{ bet.date }}</td>
                    <td>{{ bet.time }}</td>
                    <td>{{ bet.userName }}</td>
                </tr>
                </tbody>
            </table>
            <div class="myBettings__buttons">
                <router-link to="/auction" v-show="authStore.isLogged" class="btn btn-info">Посмотреть аукцион</router-link>
                <router-link to="/login" v-show="!authStore.isLogged" class="btn btn-info">Войти</router-link>
            </div>
        </div>
    </div>
</template>


<script setup>
    import {useAuthStore} from "@/store/authStore";
    import {getUserBets} from "@/helpers/getUserBets";
    import {onBeforeMount, ref} from "vue";
    import {getBetting} from "@/helpers/getBetting";
    import {getAmountMaxBetting, getAmountMaxBettingForProject} from "@/helpers/getAmountMaxBetting";

    const bettingRef = ref([])
    const authStore = useAuthStore()
    const maxBets = ref([])

    function getMyProjectsId(betting) {
        const result = []
        betting.forEach(item => { if (!result.includes(item.projectId)) result.push(item.projectId) })
        return result
    }

    onBeforeMount(async () => {
        bettingRef.value = await getUserBets()
        const myProjects = getMyProjectsId(bettingRef.value)

        myProjects.forEach(projectId => {
            const maxBet = getAmountMaxBettingForProject(bettingRef.value, projectId)
            maxBets.value.push(maxBet.id)
        })

        console.log(maxBets.value, ' - max bbets')
    })
</script>


<style scoped>
    .myBettings {
        margin-top: 118px;
    }

    .active_tr > td,
    .active_tr > th {
        background-color: #78ee97 !important;
    }

</style>