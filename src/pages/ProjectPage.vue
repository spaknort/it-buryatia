<template>
    <div :data-id="projectItem.id" class="container d-flex flex-column gap-5">
        <h1>{{ projectItem.title }}</h1>
        <div class="row">
            <div class="col-3">
                <img :src="projectItem.image" alt="ss"  class="card-img-top">
            </div>
            <div class="col-8">
                <p>{{ projectItem.content }}</p>
                <p><strong>Цена:</strong> {{ projectItem.price }}р</p>
                <p><strong>Рейтинг/Оценка:</strong> {{ (projectItem.mark === -100) ? 'Б/O': projectItem.mark.toFixed(2) }}</p>
                <a class="btn-info" :href="projectItem.link">Ссылка на оффициальный источник</a><br>
                <span class="badge bg-info" v-for="item in projectItem.tags" :key="projectItem.id">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import { $api } from "@/helpers/http";

    const id = ref(0)
    const projectItem = ref({
        id: 0,
        mark: 1.1,
        price: 2,
        link: '',
        title: '',
        image: '',
        content: '',
        tags: ['aa', 'ss']
    })

    async function getProject(projectId) {
        const response = await $api.get(`https://webcomp.bsu.ru/api/project/${projectId}`)
        const result = response.data['data']
        console.log(result)
        return {
            ...result,
            content: result.description,
            link: result.project_link,
            image: '/img/' + result.image,
            tags: result.tags.split(', ')
        }
    }

    onMounted(async () => {
        const record_id = Number(useRoute().params['id'])

        if (record_id) {
            id.value = record_id
            projectItem.value = await getProject(record_id)
        }
    })
</script>