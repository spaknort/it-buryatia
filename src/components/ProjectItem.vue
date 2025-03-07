<template>
    <div class="project-list-item">
        <div class="project-list-item__header">
            <img :src="imgSrc" :alt="title">
            <div :class="['card-rating', getRating(rating)]">
                <span class="text-white">{{ (rating === -100) ? 'Б/O': rating.toFixed(2) }}</span>
            </div>
        </div>
        <div class="project-list-item__content">
            <h5>{{ title }}</h5>
            <p>{{ content }}</p>

            <table v-if="props.betting" class="table project-list-item__betting-table">
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
                    <td>{{ bet.userName }} {{ bet.userId }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="project-list-item__footer">
            <Tags :tags="tags" />
            <div class="project-list-item__buttons">
                <router-link :to="{name: 'projectPage', params: {id: projectId}}" class="text-decoration-none text-success">Подробнее</router-link>
                <router-link v-if="props.betting" :to="{name: 'bettingHistoryPageByProject', params: {id: projectId}}" class="text-decoration-none text-success">История ставок</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import axios from "axios";
    import {useAuthStore} from "@/store/authStore";
    import {getBetting} from "@/helpers/getBetting";

    const authStore = useAuthStore()
    const props = defineProps({
        projectData: Object,
        betting: Boolean
    })
    const betting = ref([])

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

    onMounted(async () => {
        if (props.betting) {
            betting.value = await getBetting(props.projectData.id, 3)
        }
    })
</script>

<style lang="css" scoped>
    .project-list-item__betting-table {
        width: 65%;
        margin: 16px 0;
        text-align: center;
    }

    .active_tr > td,
    .active_tr > th {
        background-color: #dfdfdf !important;
    }

    .project-list-item {
        border: solid 1px gray;
    }

    .project-list-item__header {
        position: relative;
        height: 350px;
    }

    .project-list-item__content {
        padding: 24px 32px;
    }

    .project-list-item__footer {
        padding: 0 32px 24px 32px;
    }

    .project-list-item__header > img {
        width: 100%;
        height: 100%;
        user-select: none;
    }

    .rating-bg-bad {
        background-color: rgb(192, 9, 9);
    }
    .rating-bg-good {
        background-color: rgb(255, 145, 0);
    }
    .rating-bg-perfect {
        background-color:  rgb(40, 192, 9);
    }
    .rating-bg-info {
        background-color: #214eaf
    }

    .card-rating {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-size: 1.2rem;
        border-radius: 50%;
    }

    .project-list-item__buttons {
        margin-top: 12px;
        display: flex;
        align-items: center;
        column-gap: 12px;
    }
</style>