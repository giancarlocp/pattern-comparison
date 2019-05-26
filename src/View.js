import hh from 'hyperscript-helpers'
import m from 'mithril'


import tableView from './Table'

const { button, div, form, h1, h2, input, label, pre } = hh(m)

const t = (tag, className, value) => tag({className, onclick}, value)
const btn=(className,type, value, onclick) => button({className, onclick, type}, value)
const inputype =(className, type, value, oninput)=> input({className, oninput, type, value})

const fieldSet = (text, type, value, oninput) =>
  div([
    t(label,'db mb1', text),
    inputype('pa2 input-reset ba w-100 mb2', type, value, oninput),
  ])
const btnSet = (actions) =>
  div([
    btn('pv2 ph3 bg-blue white bn mr2 dim', 'submit', 'Save', ),
    btn('pv2 ph3 bg-light-gray bn dim',     'button', 'Cancel',
        (e) => actions.showFormF(false) ),
  ])
const formView = (actions, model) => {
  const { desc, cals, showForm } = model
  if (showForm)
    return form({
        className:'w-100 mv2',
        onsubmit: (e) => {
          e.preventDefault()
          actions.saveMeal() }
      },[
        fieldSet('Meal', 'text', desc,
            (e) => actions.mealInput(e.target.value) ),
        fieldSet('Calories', 'number', cals || '',
            (e) => actions.calInput(parseInt(e.target.value)) ),
        btnSet(actions),
    ])
  return btn('pv2 ph3 bg-blue white bn br4','button','Add Meal',
            () => actions.showFormF(true) )
}

// Mithril part
const AppView = {
  view: (vnode) => {
    let { state, actions } = vnode.attrs
    return div( {className:'mw6 center'}, [
      t(h1, 'f2 pv2', 'Meiosis Pattern + Mithril'),
      t(h2, 'f2 pv2 bb', 'Calorie Counter'),
      formView(actions, state),
      tableView(actions, state.meals),
      m("pre", JSON.stringify(state, null, 4)),
    ])
  }
}

export default AppView
