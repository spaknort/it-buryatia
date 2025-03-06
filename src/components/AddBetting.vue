<script setup>
    import {ref} from "vue";
    import {$api2} from "@/helpers/http";

    const props = defineProps({
        projectId: Number
    })
    const amount = ref(0)
    const maxAmount = 4294967295
    const minAmount = 1

    console.log(props.projectId, ' - add bett')

    async function addBetting() {
        try {
            const response = await $api2.put('/bids/add', { amount: amount.value, project_id: props.project.id })
            if (response.data.status === 201) alert(`Ставка на сумму ${amount} для проекта ${props.project.title}`)

            console.log(response.data.status)
        }
        catch (e) {
            console.log(e)
            alert(e.message)
        }
    }
</script>

<template>
    <form class="add-betting-form">
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