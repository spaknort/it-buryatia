import {$api} from "@/helpers/http";

export async function getProject(projectId) {
    const response = await $api.get(`https://webcomp.bsu.ru/api/project/${projectId}`)
    const result = response.data['data']

    return {
        ...result,
        content: result.description,
        link: result.project_link,
        image: '/img/' + result.image,
        tags: result.tags.split(', ')
    }
}