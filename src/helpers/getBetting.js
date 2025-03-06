import axios from "axios";
import {parseDate} from "@/helpers/parseDate";

export async function getBetting(projectId, bettingCount) {

    let url = 'https://webcomp.bsu.ru/api/2025' + ((projectId === -1) ? '/allBids': `/project_bids/${projectId}`)
    const response = await axios.get(url)
    const result = []

    for (let i = 0; i <= response.data['data'].length - 1; i++) {
        if (i === bettingCount && bettingCount !== -1) break
        const item = response.data['data'][i]
        const dateTime = parseDate(item.created_at)

        result.push({
            id: item.id,
            amount: item.amount,
            userName: item.author.user_name,
            userId: item.author.user_id,
            projectName: item.project.title,
            date: dateTime.date,
            time: dateTime.time,
        })
    }

    return result
}