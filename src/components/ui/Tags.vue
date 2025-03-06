<script setup>
    const props = defineProps({
        tags: Array
    })
</script>

<template>
    <div class="project-list-item__tags">
        <span class="bg-info project-list-item__tag" v-for="(item, index) in props.tags" :key="index">{{ item }}</span>&nbsp;&nbsp;
    </div>
</template>

<style lang="css" scoped>
    .project-list-item__tags {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
    }

    .project-list-item__tag {
        padding: 2px 12px;
        border-radius: 100px;
        font-size: .9rem;
        text-transform: lowercase;
    }
</style>