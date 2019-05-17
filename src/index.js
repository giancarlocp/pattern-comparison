import initModel  from './Model'
import { Update } from './Model'
import AppView    from './View'

import { diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

// Elm Pattern -> Impure function (Side effect)
function elmApp(initModel, update, view, node) {
  let model = initModel
  let curView = view(actions, model)
  let rootNode = createElement(curView)
  node.appendChild(rootNode)
  
  function actions(msg) {
    model = update(msg, model)
    const updatedView = view(actions, model)
    const patches = diff(curView, updatedView)
    rootNode = patch(rootNode, patches)
    curView = updatedView
  }
}

const node = document.getElementById('app')
elmApp(initModel, Update, AppView, node)
console.log('It Worked!')
