import {$api2} from "@/helpers/http";
import {parseDate} from "@/helpers/parseDate";

export async function getUserBets() {
    const response = await $api2.get('/userBids')
    const result = []
    for (let i = 0; i <= response.data['data'].length - 1; i++) {
        const item = response.data['data'][i]
        const dateTime = parseDate(item.created_at)
        result.push({
            id: item.id,
            amount: item.amount,
            userName: item.author.user_name,
            userId: item.author.user_id,
            projectName: item.project.title,
            projectId: item.project.id,
            date: dateTime.date,
            time: dateTime.time,
        })
    }

    return result
}
