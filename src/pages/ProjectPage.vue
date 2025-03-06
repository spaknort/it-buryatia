<template>
    <div class="project">
        <div class="container">
            <div class="project__inner">
                <h1 class="title">{{ projectItem.title }}</h1>
                <p class="project__description">{{ projectItem.content }}</p>
                <img :src="projectItem.image" :alt="projectItem.title"  class="project__image">

               <div class="project__params">
                   <span><strong>Цена:</strong> {{ projectItem.price }}р</span>
                   <span><strong>Рейтинг/Оценка:</strong> {{ (projectItem.mark === -100) ? 'Б/O': projectItem.mark.toFixed(2) }}</span>
               </div>
                <a :href="projectItem.link">Ссылка на оффициальный источник</a><br>

                <Tags :tags="projectItem.tags" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import {getProject} from "@/helpers/getProject";

    const id = ref(0)
    const projectItem = ref({
        id: 0,
        mark: 1.1,
        price: 2,
        link: '',
        title: '',
        image: '',
        content: '',
        tags: []
    })

    onMounted(async () => {
        const record_id = Number(useRoute().params['id'])

        if (record_id) {
            id.value = record_id
            projectItem.value = await getProject(record_id)
        }
    })
</script>

<style lang="css" scoped>
    .project {
        margin-top: 118px;
    }

    .project__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .project__description {
        font-size: 1rem;
        text-align: center;
    }

    .project__image {
        width: 80%;
        display: block;
        margin: 0 auto;
    }

    .project__params {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        margin: 12px 0;
    }
</style>