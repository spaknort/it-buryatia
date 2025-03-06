import {$api} from "@/helpers/http";

export async function getProjects(count = 3) {
    const response = await $api.get('https://webcomp.bsu.ru/api/allProjects')
    const result = []

    for (let i = 0; i <= response.data['data'].length - 1; i++) {
        if (i === count && count !== -1) break
        const item = response.data['data'][i]

        result.push({
            ...item,
            content: item.description,
            link: item.project_link,
            image: '/img/' + item.image,
            tags: String(item.tags).split(', ')
        })
    }

    return result
}