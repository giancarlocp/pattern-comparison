import * as R from 'rambda'
import { SUB } from 'mergerino'

const app = {
  initialState: {
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
  },

  actions: (update, model) => ({
    showFormF:(showForm)=> update( { showForm } ),
    mealInput:  (desc)  => update( { desc } ),
    calInput:   (cals)  => update( { cals } ),
    saveMeal: () => {
      const { editId } = model();
      (editId) ? update(edit(model)) : update(add(model))
    },
    delMeal: (id)  => {
      update({meals: SUB(x => x.filter( meal => meal.id !== id)) })
    },
    editMeal: (editId)  => {
      const meal = R.find( meal => meal.id === editId, model().meals)
      const { cals, desc } = meal
      update({desc, cals, editId, showForm:true})
    },
  }),
}

const add = (model) => {
  const { nextId, cals, desc } = model()
  const meal = { id: nextId, cals, desc }
  const meals = [...model().meals, meal]
  return {cals:0, desc:'', showForm:false, nextId:nextId+1, meals}
}
const edit = (model) => {
  const { editId, cals, desc } = model()
  const meals = R.map( meal => {
      if (meal.id === editId)
        return {...meal, cals, desc}
      return meal
    }, model().meals)
  return {cals:0, desc:'', showForm:false, editId:null, meals}
}

export default app
