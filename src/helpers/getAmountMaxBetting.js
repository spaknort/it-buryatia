export function getAmountMaxBetting(betting) {
    let maxBetting = { amount: 0 }
    betting.forEach(bet => { if (bet.amount > maxBetting.amount) maxBetting = bet })

    return maxBetting
}