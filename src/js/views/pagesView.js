import View from './View';
import icons from '/src/img/icons.svg'
class PagesView extends View {
  _parentElement = document.querySelector('.pagination');

  _generate() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    console.log(numPages);
    //Page 1
    const buttonGenerator = function(data, part) {
      if(part === 3) {
        return `          
          <button data-goto='${data.page - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${data.page - 1}</span>
          </button>
          <button data-goto='${data.page + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
          `
      }
      if(part === 2) {
        return `          
          <button data-goto='${data.page + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`
      }
      if(part === 1) {
        return `          
          <button data-goto='${data.page - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${data.page - 1}</span>
          </button>
          `
      }
    }
    if (this._data.page === 1 && numPages > 1) {
      return buttonGenerator(this._data, 2)
    }
    //Page 1 and it's the only
    if (this._data.page === 1 && numPages === 1) {
      return ``
    }
    //Last
    if (this._data.page === numPages && numPages > 1) {
      return buttonGenerator(this._data, 1)
    }
    //Others
    if (this._data.page < numPages) {
      return buttonGenerator(this._data, 3)
    }
  }
  addHandler(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline')
      if(!btn) return
      const goToPage = +btn.dataset.goto
      handler(goToPage);
    })
  }
}


export default new PagesView();