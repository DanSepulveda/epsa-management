const getExtension = (filename) => {
  const nameArray = filename.split('.')
  return nameArray[nameArray.length - 1]
}

export default getExtension
