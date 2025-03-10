export function parseDate(data) {
    const newDate = new Date(data)
    const date = `${ (newDate.getDate() >= 10) ? newDate.getDate(): '0' + newDate.getDate() }-${ ((newDate.getMonth() + 1) >= 10) ? (newDate.getMonth() + 1): '0' + (newDate.getMonth() + 1) }-${newDate.getFullYear()}`
    const time = `${ (newDate.getHours() >= 10) ? newDate.getHours(): '0' + newDate.getHours() }:${ (newDate.getMinutes() >= 10) ? newDate.getMinutes(): '0' + newDate.getMinutes() }`

    return { date, time }
}