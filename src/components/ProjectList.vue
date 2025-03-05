<template>
    <section class="bg-body-tertiary">
        <div class="py-5 container">
            <div class="py-5">
                <h2 class="text-center mx-auto">Список проектов</h2>
                <div v-if="!errorFlag" class="row row-cols-1 row-cols-md-3 g-4">
                    <ProjectItem  v-for="(item, index) in projectItems" :key="index" :projectData="item"/>
                </div>
                <div v-else>
                    <h2>Ошибка сервера</h2>
                    <p>{{ errorText }}</p>
                </div>
                <div v-if="!isAll">
                    <router-link to="/projects" class="btn btn-success btn-md mt-5">Смотреть весь список</router-link>
                    <button v-if="showButton" class="btn btn-info btn-md mt-5" @click="loadByButton">Загрузить проекты</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import ProjectItem from './ProjectItem.vue';
    import {onMounted, ref} from "vue";
    import $api from "@/helpers/http";

    const props = defineProps({
        isAll: Boolean
    })
    const projectItems = ref([])
    const showButton = ref(true)
    const errorFlag = ref(false)
    const errorText = ref('')

    function loadByButton() {
        showButton.value = false
        loadProjects(10)
    }

    async function loadProjects(count) {
        projectItems.value = []

        try {
            const response = await $api.get('https://webcomp.bsu.ru/api/allProjects')
            const data = response.data['data']

            if (!props.isAll) {
                for (let i = 0; i <= count - 1; i++) {
                    if (i === count) break
                    projectItems.value.push(data[i])
                }
            }
            else {
                data.forEach(project => projectItems.value.push(project))
            }
            errorFlag.value = false
        }
        catch (e) {
            errorFlag.value = true
            errorText.value = e.message
            console.log(e)
        }
    }

    onMounted(() => {
        loadProjects(3)
    })
</script>