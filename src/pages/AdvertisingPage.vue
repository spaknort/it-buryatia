<script setup>
    import {useAuthStore} from "@/store/authStore";
    import {$api2} from "@/helpers/http";
    import {onMounted, ref} from "vue";

    const authStore = useAuthStore()
    const bettingRef = ref([])

    async function getAllBids(count = 2) {
        const response = await $api2.get('/allBids')
        const result = []

        for (let i = 0; i <= response.data['data'].length - 1; i++) {
            if (i === count) break
            result.push(response.data['data'][i])
        }

        return result
    }

    function parseDate(data) {
        const newDate = new Date(data)
        const date = `${ (newDate.getDate() >= 10) ? newDate.getDate(): '0' + newDate.getDate() }-${ (newDate.getMonth() >= 10) ? newDate.getMonth(): '0' + newDate.getMonth() }-${newDate.getFullYear()}`
        const time = `${newDate.getHours()}:${newDate.getMinutes()}`

        return { date, time }
    }

    onMounted(async () => {
        const betting = await getAllBids(5)

        console.log(betting)

        betting.forEach(bet => {
            const dateTime = parseDate(bet.created_at)

            bettingRef.value.push({
                id: bet.id,
                projectName: bet.project.title,
                amount: bet.amount,
                date: dateTime.date,
                time: dateTime.time,
                userName: bet.author.user_name
            })
        })
    })
</script>

<template>
    <div class="jumbotron my-5">
        <div class="container d-flex flex-column gap-2">
            <h3>
                Уважаемый посетители вы можете поучаствовать в аукционе проектов. Для этого пройдите по ссылке ниже. Внимание: участие только для авторизованных пользователей.
            </h3>
            <img v-if="!authStore.isLogged" src="/img/banner.avif" alt="Banner">
            <table v-else class="table">
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
            <router-link to="/auction" v-show="authStore.isLogged" class="btn btn-info">Посмотреть аукцион</router-link>
            <router-link to="/login" v-show="!authStore.isLogged" class="btn btn-info">Войти</router-link>
        </div>
    </div>
</template>

<style scoped>

</style>