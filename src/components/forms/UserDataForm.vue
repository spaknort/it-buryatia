<template>
    <div v-if=" uploaded && errors === '' " class="alert alert-success" role="alert">
        Данные успешно загружены
    </div>
    <div v-else-if="uploaded" class="alert alert-danger" role="alert">
        При загрузке обнаружены ошибки: {{ errors }}
    </div>
    <form>
        <label for="user_name">Ваше имя</label>
        <input :value="props.userInfo.user_name" id="user_name" class="form-control mt-1" placeholder="Ваше имя" required />

        <label for="description">О вас</label>
        <textarea v-model="props.userInfo.description" id="description" class="form-control mt-1" placeholder="О вас"></textarea>

        <label for="team_name">Название команды</label>
        <input v-model="props.userInfo.team_name" id="team_name" class="form-control mt-1" placeholder="Название команды" required />

        <label for="track">Трек</label>
        <select @change="userSelectedTrack = $event.target.value" id="track" class="form-control mt-1">
            <option :selected="(track.id === props.userInfo.track_id)" v-for="track in tracks" :value="track.id">{{ track.title }}</option>
        </select><br>

        <button class="btn btn-success" @click="editProfile()">Изменить</button>
    </form>
</template>

<script setup>
    import axios from 'axios'
    import {useAuthStore} from "@/store/authStore";
    import {ref} from "vue";

    const authStore = useAuthStore()
    const props = defineProps({
        userInfo: Object
    })

    const uploaded = ref(false)
    const errors = ref('')
    const tracks = ref([
        { id: 1, title: 'HTML - вёрстка' },
        { id: 2, title: 'Фронтенд разработка на Vue.js' },
    ])
    const userSelectedTrack = ref(0)

    async function editProfile() {
        let user_name = document.getElementById("user_name").value
        let team_name = document.getElementById("team_name").value
        let description = document.getElementById("description").value
        let track_id = document.getElementById("track").value

        const requestData = {
            "user_name": user_name,
            "team_name": team_name,
            "description": description,
            "track_id": track_id
        }

        const headers = {
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + authStore.token
        }

        const response = await axios.put('https://webcomp.bsu.ru/api/userData/update', requestData, { headers })
        uploaded.value = true

        if (response.data.status !== 200) {
            errors.value = response.data.errors
        }
    }
</script>