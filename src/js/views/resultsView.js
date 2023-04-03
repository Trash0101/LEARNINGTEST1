import View from './View';
import icons from '/src/img/icons.svg'
import previewView from './previewView';
class ResultsView extends View{
  _parentElement = document.querySelector('.results');
  _errorMessage = "Recipes not found";
  _generate(data) {
    return data.map(result => previewView.render(result, false)).join('')
  };
}

export default new ResultsView();