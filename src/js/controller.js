import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import pagesView from './views/pagesView';
import bookmarksView from './views/bookmarksView';
const recipeContainer = document.querySelector('.recipe');
import addRecipeView from './views/addRecipeView';
import { addBookmark } from './model.js';
import { MODAL_DELAY } from './config';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    //MarkSelectedSearchResults
    resultsView.update(model.searchResultsPage());
    ///Loading
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe)

  //Render
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
}
const controlSearch = async  () => {
  try {
    resultsView.renderSpinner();
    //Get query
    const query = searchView.getQuery();
    if(!query) return
    //Search results
    await model.loadSearch(query);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.searchResultsPage());
    //Render pages
    pagesView.render(model.state.search);
    //Render it
  } catch (err) {
    console.error(err);
  }
};

const controlPages= (pageNum) => {
  console.log('Hi!')
  resultsView.render(model.searchResultsPage(pageNum));
  pagesView.render(model.state.search);
}
// ['hashchange', 'load']
//   .forEach(ev => window.addEventListener(ev, controlRecipe));

const controlServings = function(newAmount) {
  //Update the recipe servings(in state)
  model.changeServings(newAmount);
  //Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
};
const controlAddBookmark = () => {
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //Update view
  recipeView.update(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}
const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
}
const newFeauture = () => {
  console.log('WelCUM');
}
newFeauture();
const controlAddRecipe = async (newRecipe) => {
  try {
    //SPEEEEEEN
    addRecipeView.renderSpinner();

    //Upload new data
    await model.uploadRecipe(newRecipe);
    //Render it
    recipeView.render(model.state.recipe);
    //Display success
    addRecipeView.renderMessage();
    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);
    //Change HASH
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    window.history.back()
    //Close forms
    setTimeout(function() {
      addRecipeView._toggle();
    }, MODAL_DELAY * 1000)
  }catch (err) {
    console.error('FUCK', err);
    addRecipeView.renderError(err.message);
  }
}
const init = (callBack, ...a) => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(callBack, a);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  pagesView.addHandler(controlPages);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init(controlRecipe, 'hashchange', 'load');
