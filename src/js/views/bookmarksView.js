import View from './View';
import icons from '/src/img/icons.svg'
import previewView from './previewView';
class BookmarksView extends View{
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = "No bookmarks";

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generate(data) {
    return data.map(bookmark => previewView.render(bookmark, false)).join('')
  };
}

export default new BookmarksView();