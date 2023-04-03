import { API_KEY, API_URL, RES_PER_PAGE } from './config';
import { AJAX } from './helper';
export const state = {
  recipe: {
  },
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: []
}
/**
 * Render the received object to the dom
 * @param {Object | Object[]} data the data to be rendered
 * @returns {undefined}
 *
 * */
const createRecipeObject = (data) => {
  const { recipe } = data.data;
  return{
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}),
  };
}
export const loadRecipe = async (id) => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`)
    state.recipe = createRecipeObject(data);
    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async (query) => {
  try {

    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key: rec.key}),
      }
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const searchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page -1) * state.search.resultsPerPage;
  const end = state.search.resultsPerPage * page;

  return state.search.results.slice(start, end);
};

export const changeServings = (newAmount) => {
  state.recipe.ingredients.forEach(el => {
    el.quantity = el.quantity * newAmount / state.recipe.servings;
  });
  state.recipe.servings = newAmount;
};
const persistentData = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
export const addBookmark = (recipe) => {
  //Add bookmark
  state.bookmarks.push(recipe);
  //Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistentData()
}

export const deleteBookmark = (id) => {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id = id);
  state.bookmarks.splice(index, 1)
  if(id === state.recipe.id) state.recipe.bookmarked = false;
  persistentData();
}

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
};
init()

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async (newRecipe) => {
  try {
    const ingredients = Object
      .entries(newRecipe)
      .filter(el => el[0].startsWith('ingredient') && el[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format!');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }


}