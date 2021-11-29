
export const getCurrentMonth = () => {
    let now = new Date()
    return `${now.getFullYear()}-${(now.getMonth()+1)}`
}

export const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-')
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    return `${months[parseInt(month) - 1]} de ${year}`
}
