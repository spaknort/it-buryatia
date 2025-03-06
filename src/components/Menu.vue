<script setup>
    import {ref} from "vue";
    import {getRoutes} from "@/helpers/getRoutes";

    const menuItems = ref(getRoutes())
    const props = defineProps({
        color_is_dark: Boolean
    })
</script>

<template>
    <nav class="menu">
        <router-link v-for="(item, index) in menuItems" :key="index" :to="item.link" :class="'menu__item ' +((props.color_is_dark) ? 'menu__item_dark': 'menu__item_light')">
            {{ item.title }}
            <svg v-if="item.children.length > 0 && !props.color_is_dark" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.31825e-07 1.70803 -4.02177e-07L8.29197 -1.14384e-07C8.97024 -8.47357e-08 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z" :fill="(props.color_is_dark) ? '#222': '#fafafa'"/>
            </svg>
            <div v-if="item.children.length > 0 && !props.color_is_dark" class="menu__dropdown">
                <router-link v-for="(subItem, subItemIndex) in item.children" :key="subItemIndex" :to="subItem.link" :class="'menu__sub-item ' +((props.color_is_dark) ? 'menu__item_dark': 'menu__item_light')">{{ subItem.title }}</router-link>
            </div>
        </router-link>
    </nav>
</template>

<style lang="css" scoped>
    .menu {
        display: flex;
        align-items: center;
        column-gap: 24px;
    }

    .menu__item {
        position: relative;
    }

    .menu__item > svg {
        margin-left: 5px;
        transition: .5s linear;
    }

    .menu__sub-item {
        padding: 16px 20px;
        border-bottom: solid 1px #fafafa;
    }

    .menu__sub-item:last-child {
        border-bottom: none;
    }

    .menu__item,
    .menu__sub-item {
        font-size: 1rem;
    }

    .menu__item_dark {
        color: #222!important;
    }

    .menu__item_light {
        color: #fafafa!important;
    }

    .menu__item:hover .menu__dropdown {
        display: flex;
        visibility: visible;
        opacity: 1;
    }

    .menu__item:hover > svg {
        transform: rotate(180deg);
    }

    .menu__dropdown {
        position: absolute;
        left: 50%;
        top: 20px;
        width: max-content;
        min-width: 200px;
        background-color: #343a40;
        transform: translateX(-50%);
        display: none;
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
        transition: .5s linear;
        z-index: 2;
    }
</style>