function useFormatDate(date) {
  return JSON.stringify(date).slice(1).split('T')[0].split('-').reverse().join('-')
}

export default useFormatDate
