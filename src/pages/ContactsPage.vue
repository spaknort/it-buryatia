<script setup>

</script>

<template>
    <div class="contacts">
       <div class="container">
           <div class="contacts__inner">
               <h1 class="title">Название команды: SPAKNORT</h1>
               <div class="contacts__participants">
                   <span>Участник 1: Поплевин Павел Владимирович</span>
                   <span>Участник 2: Степанов Тимур Ильич</span>
               </div>
           </div>
       </div>
    </div>
</template>

<style scoped>
    .contacts {
        margin-top: 118px;
    }

    .contacts__inner {
        text-align: center;
    }

    .contacts__participants {
        display: flex;
        flex-direction: column;
        row-gap: 3px;
        margin-top: 24px;
    }
</style>