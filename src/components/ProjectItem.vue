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
            </div>
            <div class="my-3 px-3">
                <span class="badge bg-info" v-for="(item,index) in getTags(tags)" :key="index">{{ item }}</span>&nbsp;&nbsp;                
            </div>
            <div class="my-3 px-3">
                <router-link :to="{name: 'projectPage', params: {id: projectId}}" class="text-decoration-none text-success">Подробнее</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";

    const props = defineProps({
        projectData: Object
    })

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

    const getImgPath = img => "/img/" + img
    const getTags = tags => tags.split(',')
</script>