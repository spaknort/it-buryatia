<template>
    <div class="myBettings">
        <div class="container">

            <h2 class="title">Выигрышные/Проигрышные ставки</h2>
            <select v-model="selectedField" class="form-select" aria-label="Default select example">
                <option selected value="0">Выберете вид ставки</option>
                <option value="1">Выигрышные</option>
                <option value="2">Проигрышные</option>
            </select>
            <table class="table">
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
                    <p class="alert-info text-center" v-if="writingBetting.length === 0 && selectedField !== '0'">Таких ставок нет</p>
                    <tr v-for="bet in writingBetting">
                        <td scope="row">{{ bet.id }}</td>
                        <td>
                            <router-link :to="'/betting-history/' + bet.projectId">{{ bet.projectName }}</router-link>
                        </td>
                        <td>{{ bet.amount }}</td>
                        <td>{{ bet.date }}</td>
                        <td>{{ bet.time }}</td>
                        <td>{{ bet.userName }}</td>
                    </tr>
                </tbody>
            </table>

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
                    <td>
                        <router-link :to="'/betting-history/' + bet.projectId">{{ bet.projectName }}</router-link>
                    </td>
                    <td>{{ bet.amount }}</td>
                    <td>{{ bet.date }}</td>
                    <td>{{ bet.time }}</td>
                    <td>{{ bet.userName }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
    import {useAuthStore} from "@/store/authStore";
    import {getUserBets} from "@/helpers/getUserBets";
    import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
    import {getBetting} from "@/helpers/getBetting";
    import {
        getAmountMaxBetting,
        getAmountMaxBettingForProject,
        getAmountMaxBettingForUser, getAmountMaxBettingForUserByProject
    } from "@/helpers/getAmountMaxBetting";
    import {$api2} from "@/helpers/http";

    const bettingRef = ref([])
    const authStore = useAuthStore()
    const maxBets = ref([])

    const bets = ref([])
    const myProjectsId = ref([])
    const selectedField = ref("0")

    const worstBetting = ref([])
    const bestBetting = ref([])
    const writingBetting = ref([])

    watch(selectedField, async (newValue, oldValue) => {
        if (Number(newValue) === 1) {
            console.log('bestBetting')
            writingBetting.value = bestBetting.value
        }
        if (Number(newValue) === 2) {
            console.log('worstBetting')
            writingBetting.value = worstBetting.value
        }

        console.log(writingBetting.value)
    })

    function getMyProjectsId(betting) {
        const result = []
        betting.forEach(item => { if (!result.includes(item.projectId)) result.push(item.projectId) })
        return result
    }

    onBeforeMount(async () => {
        bets.value = await getBetting(-1, -1)
        bettingRef.value = await getUserBets()
        myProjectsId.value = getMyProjectsId(bettingRef.value)

        myProjectsId.value.forEach(id => {
            const maxBetForProject = getAmountMaxBettingForProject(bets.value, id)
            const myMaxBetForProject = getAmountMaxBettingForUserByProject(bets.value, id, authStore.userData.user_id)

            if (maxBetForProject.amount > myMaxBetForProject.amount) worstBetting.value.push(myMaxBetForProject)
            else bestBetting.value.push(myMaxBetForProject)
        })

        myProjectsId.value.forEach(projectId => {
            const maxBet = getAmountMaxBettingForProject(bettingRef.value, projectId)
            maxBets.value.push(maxBet.id)
        })
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

    .form-select {
        margin: 24px auto;
        display: block;
    }

</style>