<template>
    <div class="container d-flex flex-column gap-5">
        <h1>{{ item.title }}</h1>
        <div class="row">
            <div class="col-3">
                <img :src=item.imgSrc class="card-img-top">                
            </div>
            <div class="col-8">
                <p>{{ item.content }}</p>
                <span class="badge bg-info" v-for="(item,index) in item.tags" :key="index">{{ item }}</span> 
                </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ProjectPage',
    components: {        
    },
    data(){
        return{
            id:0,
            item:{}
        }
    },
    created(){
        const record_id=this.$route.params.id
        if (record_id){
            this.id=record_id
            this.item=this.getProject(record_id)
        }
    },
    methods:{
        getProject(record_id){
            var projectItems=[
               {
                    id: 1,
                    imgSrc: '/img/project_3.jpg',
                    rating: 2.3, 'title': "BePed.ru",
                    content: "Образовательный сайт для начинающего педагога дополнительного образования",
                    tags: ["EduNet", "Сайт"]
                },
                {
                    id: 2,
                    imgSrc: '/img/project_2.jpg',
                    rating: 3.6, title: "Разработка 3D-сканера помещений",
                    content: "Образовательный сайт для начинающего педагога дополнительного образования",
                    tags: ["TechNet", "Устройство"]
                },
                {
                    id: 10,
                    imgSrc: '/img/project_1.jpg',
                    rating: 4.7, 'title': "No trash",
                    content: "Мобильное приложение по сбору мусора в Республике Бурятия",
                    tags: ["TechNet", "Устройство"]
                },
            ]
            var it=projectItems.find(({id}) => id == record_id)
            return it
        }
    }
}
</script>