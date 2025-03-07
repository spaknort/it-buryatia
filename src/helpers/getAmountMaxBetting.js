export function getAmountMaxBetting(betting) {
    let maxBetting = { amount: 0 }
    betting.forEach(bet => { if (bet.amount > maxBetting.amount) maxBetting = bet })

    return maxBetting
}

export function getAmountMaxBettingForUser(betting, userId) {
    let maxBetting = { amount: 0 }
    betting.forEach(bet => {
        if (bet.amount > maxBetting.amount && bet.userId === userId) maxBetting = bet
    })

    return maxBetting
}

export function getAmountMaxBettingForProject(betting, projectId) {
    let maxBetting = { amount: 0 }
    betting.forEach(bet => {
        if (bet.amount > maxBetting.amount && bet.projectId === projectId) maxBetting = bet
    })

    return maxBetting
}

export function getAmountMaxBettingForUserByProject(betting, projectId, userId) {
    let maxBetting = { amount: 0 }
    betting.forEach(bet => {
        if (bet.amount > maxBetting.amount && bet.userId === userId && bet.projectId === projectId) maxBetting = bet
    })

    return maxBetting
}