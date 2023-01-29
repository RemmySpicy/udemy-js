import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJson } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
    },
}

export const loadRecipe = async function(id) {
    try {   
        const data = await getJson(`${API_URL}${id}`);
        console.log(data);
	
	    const {recipe} = data.data;
	    state.recipe = {
	        id: recipe.id,
	        title: recipe.title,
	        publisher: recipe.publisher,
	        sourceUrl: recipe.source_url,
	        image: recipe.image_url,
	        servings: recipe.servings,
	        cookingTime: recipe.cooking_time,
	        ingredients: recipe.ingredients
	    };
	    console.log(state.recipe);
    } catch (error) {
        console.error(`${error} 🔥🔥🔥🔥`);
        throw error;
    }
}

export const loadSearchResult = async function(query) {
    try {
        const data = await getJson(`${API_URL}?search=${query}`)
        console.log(data);

        state.search.query = query;

        state.search.result = data.data.recipes.map(rec => {
            return {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
            }
        });
        
    } catch (error) {
        throw error;
    }
}
