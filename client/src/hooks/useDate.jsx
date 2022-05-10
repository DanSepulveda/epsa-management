const useDate = () => {
    const date = new Date()
    let currentDay = date.getDate()
    let currentMonth = date.getMonth() + 1
    let currentYear = date.getFullYear()

    if (currentDay < 10) {
        currentDay = `0${currentDay}`
    }
    if (currentMonth < 10) {
        currentMonth = `0${currentMonth}`
    }

    return `${currentYear}-${currentMonth}-${currentDay}`
}

export default useDate