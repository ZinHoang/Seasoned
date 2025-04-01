import request from 'superagent'

export async function getRecipes(userInput) {
  try {
    const res = await request.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${userInput}&app_id=${process.env.APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&from=0&to=6`
    )
    const result = res.body.hits.slice(0, 15)
    return result
  } catch (err) {
    console.log('Error getting recipes from Edamam API. Error: ' + err)
  }
}
