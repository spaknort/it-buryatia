<template>
    <div class="col">
        <div class="card h-100">
            <div class="project-img">
                <img :src=getImgPath(imgSrc) class="card-img-top" alt="Project">
                <div :class="['card-rating', getRating(rating)]">
                    <span class="fs-2 text-white">{{ (rating === -100) ? 'Б/O': rating.toFixed(2) }}</span>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ content }}</p>

                <table v-if="betting" class="table card__betting-table">
                    <thead class="thead-active">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Размер ставки</th>
                        <th scope="col">Кто сделал ставку</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="bet in betting" :key="bet.id" :class="(bet.userId === authStore.userData.user_id) ? 'active_tr': ''">
                        <th>{{ bet.id }}</th>
                        <td>{{ bet.amount }}</td>
                        <td>{{ bet.userName }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="my-3 px-3 d-flex gap-2">
                <span class="badge bg-info" v-for="(item,index) in getTags(tags)" :key="index">{{ item }}</span>&nbsp;&nbsp;                
            </div>
            <div class="my-3 px-3 d-flex gap-4">
                <router-link :to="{name: 'projectPage', params: {id: projectId}}" class="text-decoration-none text-success">Подробнее</router-link>
                <router-link :to="{name: 'bettingHistoryPageByProject', params: {id: projectId}}" class="text-decoration-none text-success">История ставок</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import axios from "axios";
    import {useAuthStore} from "@/store/authStore";

    const authStore = useAuthStore()
    const props = defineProps({
        projectData: Object,
        betting: Boolean
    })
    const betting = ref([
        {
            id: 6,
            userId: 233,
            userName: 'Pavel',
            amount: 0,
        }
    ])

    const
        projectId = ref(props.projectData.id),
        imgSrc = ref(props.projectData.image),
        rating = ref(props.projectData.mark),
        title = ref(props.projectData.title),
        content = ref(props.projectData.content),
        tags = ref(props.projectData.tags)

    function getRating(rating) {
        if (rating <= 3) return 'rating-bg-bad'
        else if(rating <= 4) return 'rating-bg-good'
        else if (rating === -100) return '.rating-bg-info'
        else return 'rating-bg-perfect'
    }

    async function getBettingForProject(projectId, bettingCount) {
        const response = await axios.get(`https://webcomp.bsu.ru/api/2025/project_bids/${projectId}`)
        const result = []

        for (let i = 0; i <= response.data['data'].length - 1; i++) {
            if (i === bettingCount) break
            const item = response.data['data'][i]

            result.push({
                id: item.id,
                amount: item.amount,
                userName: item.author.user_name,
                userId: item.author.id
            })
        }

        return result
    }

    const getImgPath = img => "/img/" + img
    const getTags = tags => tags.split(',')

    onMounted(async () => {
        if (props.betting) {
            const result = await getBettingForProject(props.projectData.id, 2)
            betting.value = [...betting.value, ...result]
        }
    })
</script>

<style lang="css" scoped>
    .card__betting-table {
        width: 100%;
        margin: 16px auto;
        text-align: center;
    }

    .active_tr > td,
    .active_tr > th {
        background-color: #dfdfdf !important;
    }
</style>