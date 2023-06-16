module.exports = async function tryCatch(promise) {
  try {
    const data = await promise
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}
