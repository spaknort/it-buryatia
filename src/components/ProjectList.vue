<template>
    <section class="project-list">
        <div class="container">
            <div class="project-list__inner">
                <h2 class="title">Список проектов</h2>
                <div class="project-list__items">
                    <ProjectItem v-for="(item, index) in projectItems" :key="index" :betting="props.betting" :projectData="item"/>
                </div>
                <div class="project-list__buttons" v-if="props.count !== -1">
                    <router-link to="/projects" class="btn btn-success btn-md mt-5">Смотреть весь список</router-link>
                    <button v-if="showButton" class="btn btn-info btn-md mt-5" @click="getAllProjects">Загрузить проекты</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import ProjectItem from './ProjectItem.vue';
    import {onMounted, ref} from "vue";
    import {getProject} from "@/helpers/getProject";
    import {getProjects} from "@/helpers/getProjects";

    const props = defineProps({
        count: Number,
        betting: Boolean
    })
    const projectItems = ref([])
    const showButton = ref(true)

    async function getAllProjects() {
        showButton.value = false
        projectItems.value = await getProjects(-1)
    }

    onMounted(async () => {
        projectItems.value = await getProjects(props.count || 3)
    })
</script>

<style lang="css" scoped>
    .project-list__items {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-top: 24px;
    }

    .project-list {
        margin-top: 118px;
    }

    .project-list,
    .project-list__inner {
        width: 100%;
    }

    .project-list__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .project-list__buttons {
        display: flex;
        align-items: center;
        gap: 12px;
    }
</style>