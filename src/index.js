import AppView from './View'
import app     from './Model'

import m from 'mithril'
import stream from 'mithril/stream'
import merge  from 'mergerino'

// Meiosis Pattern
const update = stream()
const states = stream.scan(merge, app.initialState, update)
const actions = app.actions(update, states)

// Mithril part
const mainView = {
  view: (vnodes) => m(AppView, { state: states(), actions })
}

const node = document.getElementById('app')
m.mount(node, mainView)
console.log('It Worked!')
