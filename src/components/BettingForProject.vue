<script setup>
    import {onBeforeMount, ref, watch} from "vue";
    import {getBetting} from "@/helpers/getBetting";
    import {useAuthStore} from "@/store/authStore";
    import {getAmountMaxBetting} from "@/helpers/getAmountMaxBetting";

    const authStore = useAuthStore()
    const props = defineProps({
        betting: Array,
        projectId: Number,
        title: String,
        isMax: Boolean,
    })
    const betting = ref(props.betting)
    const selectedField = ref("1")

    watch(selectedField, async (newValue, oldValue) => {
        if (Number(newValue) === 1) {
            betting.value = props.betting
        }
        if (Number(newValue) === 2) {
           const usersId = []
           const maxBettings = []

           betting.value.forEach(item => { if (!usersId.includes(item.userId)) usersId.push(item.userId) })
           usersId.forEach(userId => {
               let maxBetting = { amount: 0 }
               betting.value.forEach(item => { if (item.userId === userId && item.amount > maxBetting.amount) maxBetting = item })
               maxBettings.push(maxBetting)
           })
           betting.value = maxBettings
        }
    })

    onBeforeMount(async () => {
        const allBetting = await getBetting(props.projectId)

        if (props.isMax) betting.value = [getAmountMaxBetting(allBetting)]
        else betting.value = allBetting
    })
</script>

<template>
    <div class="betting-for-project">
        <h3>{{ props.title }}</h3>

        <select v-model="selectedField" v-if="!isMax" class="form-select" aria-label="Default select example">
            <option value="1">Все ставки</option>
            <option value="2">Лучшие ставки</option>
        </select>

        <div class="betting-for-project__scroll-area">
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Размер ставки</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Время</th>
                    <th scope="col">Кто поставил</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bet in betting" :class="(bet.userId === authStore.userData.user_id) ? 'active_tr': ''">
                    <td scope="row">{{ bet.id }}</td>
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

<style scoped>
    .betting-for-project {
        width: 100%;
        margin-top: 50px;
    }

    .active_tr > td,
    .active_tr > th {
        background-color: #dfdfdf !important;
    }

    .betting-for-project__scroll-area {
        width: 100%;
        overflow-y: scroll;
        max-height: 400px;
    }

    .table {
        margin-top: 26px;
    }
</style>