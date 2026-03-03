export async function errorHandler (asyncOperation) {
  try {
    const result =  await asyncOperation()
    return { success : true, data : result }
  } catch ( error ) {
    console.log(error)
    return { success : false }
  }
}