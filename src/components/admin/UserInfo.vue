<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ userInfo.user_name }}</h5>
            <p><strong>Название команды:</strong> {{ userInfo.team_name }}</p>
            <p><strong>Трек:</strong> {{ userInfo.track_name }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle"
                    viewBox="0 0 16 16"
                    @click="showInfo()"
                    >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
            </p>
            <p v-if="showTrackInfo"><strong >О Треке:</strong> {{ userInfo.track_description }}</p>
            <p><strong>Обо мне:</strong> {{ userInfo.description }}</p>
            <p><strong>Обновлено:</strong> <i>{{ userInfo.updated_at }}</i></p>            
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserInfo',
    props: ['userInfo'],
    data() {
        return {            
            showTrackInfo:false
        }
    },
    methods:{
        showInfo(){
            this.showTrackInfo=true
        }
    }
}
</script>