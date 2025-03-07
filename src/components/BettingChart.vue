<script setup>
    import {onMounted} from 'vue'
    import { Chart, registerables } from 'chart.js'
    import {getBetting} from "@/helpers/getBetting";

    const props = defineProps({
        projectId: Number,
        title: String
    })

    async function getBettingDataSortedByDate() {
        const betting = await getBetting(props.projectId, -1)
        let bettingSimple = []

        betting.forEach(item => {
            bettingSimple.push({
                dateTime: item.date + ' ' + item.time,
                amount: item.amount,
            })
        })
        bettingSimple.sort((a, b) => new Date(a.dateTime.replace(/(\d{2})-(\d{2})/, '$2-$1')) - new Date(b.dateTime.replace(/(\d{2})-(\d{2})/, '$2-$1')));

        const amountArray = []
        const dateTimeArray = []

        bettingSimple.forEach(item => {
            dateTimeArray.push(item.dateTime)
            amountArray.push(item.amount)
        })

        return {
            dateTime: dateTimeArray,
            amount: amountArray,
        }
    }

    onMounted(async () => {
        const response = await getBettingDataSortedByDate()
        const ctx = document.getElementById('myChart')
        Chart.register(...registerables)

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: response.dateTime,
                datasets: [
                    {
                        label: 'Amounts',
                        data: response.amount,
                        fill: false,
                        borderColor: '#007BFF',
                    },
                ]
            }
        })
    })
</script>

<template>
    <div class="chart">
        <h1 class="title">{{ props.title }}</h1>
        <canvas width="700" height="400" id="myChart"></canvas>
    </div>
</template>

<style scoped lang="css">
    .chart {
        margin-top: 48px;
    }
</style>