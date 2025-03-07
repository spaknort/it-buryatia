<script setup>
    import {onBeforeMount, onUpdated, ref} from "vue";
    import {getAmountMaxBetting, getAmountMaxBettingForUser} from "@/helpers/getAmountMaxBetting";
    import {getBetting} from "@/helpers/getBetting";
    import {useAuthStore} from "@/store/authStore";
    import {$api2} from "@/helpers/http";

    const props = defineProps({
        betting: Array,
        projectId: Number,
        title: String,
    })
    const emit = defineEmits(['update-betting'])
    const authStore = useAuthStore()
    const betting = ref(props.betting)

    const amount = ref(0)
    const maxAmount = 4294967295
    const minAmount = 1

    async function checkBetting(amount) {
        if (amount > minAmount && amount < maxAmount && Number.isInteger(amount)) {
            const bettings = await getBetting(props.projectId, -1)
            const maxBet = getAmountMaxBetting(bettings)
            const maxBetForUser = getAmountMaxBettingForUser(bettings, authStore.userData.user_id)

            console.log(bettings, authStore.userData.user_id, maxBetForUser.amount, amount)

            if (maxBetForUser.amount > amount) throw new Error(`Ваша ставка меньше вашей максимальной ставки по проекту. Эта ставка не валидна, сделайте новую, которая будет больше чем ${maxBetForUser.amount}`)
            if (maxBet.amount > amount) alert(`Ваша ставка меньше максимальной ставки по проекту. Максимальная ставка по проекту = ${maxBet.amount}. Ставка валидна.`)

            return amount
        }
        else throw new Error('Сумма ставки не валидна')
    }

    async function addBetting() {
        try {
            await checkBetting(amount.value)
            const response = await $api2.put('/bids/add', { amount: amount.value, project_id: props.projectId })
            if (response.data.status === 201) alert(`Ставка на сумму ${amount}`)
            emit('update-betting')
        }
        catch (e) {
            console.log(e)
            alert(e.message)
        }
    }

    onUpdated(() => {
        betting.value = props.betting
    })

    onBeforeMount(async () => {
        betting.value = await getBetting(props.projectId)
    })
</script>

<template>
    <form class="add-betting-form">
        <h1 class="title">{{ props.title }}</h1>
        <input :max="maxAmount" :min="minAmount" type="number" class="add-betting-form__field form-control" v-model="amount" placeholder="Сумма ставки" aria-label="Amount (to the nearest dollar)">
        <button class="btn btn-dark add-betting-form__btn" @click.prevent="addBetting" type="submit">Сделать ставку</button>
    </form>
</template>

<style scoped lang="css">
    .add-betting-form {
        margin-top: 42px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    .add-betting-form__field {
        width: 100%;
        padding: 10px 24px;
        font-size: 1rem;
    }

    .add-betting-form__btn {
        width: 100%;
        padding: 12px 0;
        font-size: 1rem;
    }
</style>