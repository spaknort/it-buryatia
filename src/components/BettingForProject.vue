<script setup>
import {onBeforeMount, ref} from "vue";
import {getBetting} from "@/helpers/getBetting";

    const props = defineProps({
        projectId: Number,
        title: String
    })
    const betting = ref([])

    onBeforeMount(async () => {
       betting.value = await getBetting(props.projectId)
    })
</script>

<template>
    <div class="betting-for-project">
        <h3>{{ props.title }}</h3>
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
                <tr v-for="bet in betting">
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

    .betting-for-project__scroll-area {
        width: 100%;
        overflow-y: scroll;
        max-height: 400px;
    }

    .table {
        margin-top: 26px;
    }
</style>