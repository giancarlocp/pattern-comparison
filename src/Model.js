import * as R from 'rambda'


const initModel = {
    desc: 'Breakfast',
    cals: 450,
    showForm: false,
    nextId: 5,
    editId: null,
    meals: [
      {id: 1, cals:450, desc:'breakfast'},
      {id: 2, cals:180, desc:'snack'},
      {id: 3, cals:540, desc:'lunch'},
      {id: 4, cals:450, desc:'dinner'},
    ],
}

// ###############
// #  Update.js  #
// ###############
export const showFormF = (showForm) => ({
  type: 'SHOW_FORM',  showForm,
})
export const mealInput = (desc) => ({
  type: 'MEAL_INPUT',  desc,
})
export const calInput = (cals) => ({
  type: 'CALORIES_INPUT',  cals,
})
export const saveMeal = {type:'SAVE_MEAL'}

export const delMeal = (id) => ({
  type: 'DEL_MEAL',  id,
})
export const editMeal = (editId) => ({
  type: 'EDIT_MEAL',  editId,
})

const Update = (msg, model) => {
  switch (msg.type) {
    case 'SHOW_FORM':
      const { showForm } = msg
      return {...model, showForm}
    case 'MEAL_INPUT':
      const { desc } = msg
      return {...model, desc}
    case 'CALORIES_INPUT':
      const { cals }  = msg
      return {...model, cals}
    case 'SAVE_MEAL':
      const { editId } = model
      return (editId) ? edit(model) : add(model)
    case 'DEL_MEAL':
      const { id } = msg
      const meals = R.filter( meal => meal.id !== id, model.meals)
      return {...model, meals}
    case 'EDIT_MEAL': { // <- scoping vars
      const { editId } = msg
      const meal = R.find( meal => meal.id === editId, model.meals)
      const { cals, desc } = meal
      return {...model, desc, cals, editId, showForm:true}
    }
  }
  console.log('update default')
  return model
}

const add = (model) => {
  const { nextId, cals, desc } = model
  const meal = { id: nextId, cals, desc }
  const meals = [...model.meals, meal]
  return {...model, cals:0, desc:'', showForm:false, nextId:nextId+1, meals}
}
const edit = (model) => {
  const { editId, cals, desc } = model
  const meals = R.map( meal => {
      if (meal.id === editId)
        return {...meal, cals, desc}
      return meal
    }, model.meals)
  return {...model, cals:0, desc:'', showForm:false, editId:null, meals}
}

export default initModel
export { Update }
