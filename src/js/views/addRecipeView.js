import View from './View';
import icons from '/src/img/icons.svg'
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _message = `Recipe successfully uploaded`

  _window = document.querySelector('.add-recipe-window');

  _overlay = document.querySelector('.overlay');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggle.bind(this))
  }
  _toggle() {
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }
  _generate() {

  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggle.bind(this))
    this._overlay.addEventListener('click', this._toggle.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault()
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data)
    })
  }
}


export default new addRecipeView();