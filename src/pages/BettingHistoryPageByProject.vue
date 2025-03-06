<template>
    <div :data-id="projectItem.id" class="betting-history">
        <div class="container">
            <div class="betting-history__inner">
                <h1 class="title">{{ projectItem.title }}</h1>
                <p>{{ projectItem.content }}</p>
                <img :src="projectItem.image" :alt="projectItem.title"  class="betting-history__image">

                <AddBetting :projectId="projectId" />
                <BettingForProject :betting="betting" title="Ставки по проекту" :project-id="projectId" :is-max="false" />
                <BettingForProject :betting="betting" title="Максимальная ставка по проекту" :project-id="projectId" :is-max="true" />
                <BettingChart :projectId="projectId" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import {getProject} from "@/helpers/getProject";
    import BettingForProject from "@/components/BettingForProject.vue";
    import AddBetting from "@/components/AddBetting.vue";
    import BettingChart from "@/components/BettingChart.vue";
    import {getBetting} from "@/helpers/getBetting";

    const betting = ref([])
    const projectId = ref(Number(useRoute().params['id']))
    const projectItem = ref({
        id: 0,
        title: '',
        image: '',
        content: '',
    })

    onMounted(async () => {
        if (projectId.value) {
            projectItem.value = await getProject(projectId.value)
            betting.value = await getBetting(projectId.value)
        }
    })
</script>

<style lang="css" scoped>
    .betting-history {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 118px;
        text-align: center;
    }

    .betting-history__image {
        width: 70%;
    }
</style>