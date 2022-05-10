const formatDate = (date) => {
    return JSON.stringify(date).slice(1).split('T')[0].split('-').reverse().join('-')
}

module.exports = formatDate