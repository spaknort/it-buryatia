<template>
    <div class="container d-flex flex-column gap-5">
        <h1>{{ projectItem.title }}</h1>
        <div class="row">
            <div class="col-3">
                <img :src="projectItem.imgSrc" alt="ss"  class="card-img-top">
            </div>
            <div class="col-8">
                <p>{{ projectItem.content }}</p>
                <span class="badge bg-info" v-for="item in projectItem.tags" :key="index">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {useRoute} from "vue-router";
    import axios from "axios";

    const id = ref(0)
    const projectItem = ref({
        title: '',
        imgSrc: '',
        content: '',
        tags: ['aa', 'ss']
    })

    async function getProject(projectId) {
        const response = await axios.get(`https://webcomp.bsu.ru/api/project/${projectId}`)

        console.log(response.data)
        return response.data['data']
    }

    onBeforeMount(async () => {
        const record_id = Number(useRoute().params['id'])

        if (record_id) {
            id.value = record_id
            projectItem.value = await getProject(record_id)
        }
    })
</script>