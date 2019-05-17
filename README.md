# Pattern Comparison

A small comparison between two frontend Design Pattern:
* the Elm architecture or pattern
* the Meiosis pattern.

Check out the branches.

https://github.com/giancarlocp/pattern-comparison/compare/master...meiosis?expand=1

## Calorie Counting App

This is based on the calorieCounter App developed by @knowthen with the Elm pattern.
It is small but ilustrative App.

https://github.com/knowthen/fpjs/blob/master/caloriecounter/PLAN.md

First we will show the View/Component plan. It will be the same in both.

* View Functions

In Elm pattern we define Data aside Actions.
Actions is a term used in Meiosis pattern and refer to "dispatch and messages" in the Elm terminology.

In Meiosis pattern we define Data and Actions together (embedded in an Object),
we can split them like Elm though.

Then I will present as follow

* Data Model - Elm Pattern
* Data Model & Actions - Meiosis Pattern
* Actions - Elm Pattern

At the end we define the pattern's core, the reaction mechanism.

* Reaction Mechanism - Elm Pattern
* Reaction Mechanism - Meiosis Pattern


**Note:** Meiosis is builded on stream, and there are two good options, *flyd* and *mithril-stream*.
I choose the latter, thus I will use *mithril.js* as the virtual-dom manager.



### View Functions
```
view
├─┬ formView
│ ├── fieldSet
│ └── buttonSet
└─┬ tableView
  ├── tableHeader
  └─┬ mealsBody
    ├─┬ mealRow
    │ └── cell
    └── totalRow
```


### Data Model - Elm Pattern

```javascript
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
```


### Data Model & Actions - Meiosis Pattern

```javascript
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
      const { editId } = model;
      (editId) ? update(edit(model)) : update(add(model));
    },
    delMeal: (id)  => { // S from Patchinko
      update({meals: S(x => x.filter( meal => meal.id !== id)) });
    },
    editMeal: (editId)  => {
      const meal = R.find( meal => meal.id === editId, model.meals);
      const { cals, desc } = meal;
      update({desc, cals, editId, showForm:true});
    },
  }),
}

const add = (model) => {
  const { nextId, cals, desc } = model;
  const meal = { id: nextId, cals, desc };
  const meals = [...model.meals, meal];
  return {cals:0, desc:'', showForm:false, nextId:nextId+1, meals};
}
const edit = (model) => {
  const { editId, cals, desc } = model;
  const meals = R.map( meal => {
      if (meal.id === editId)
        return {...meal, cals, desc};
      return meal;
    }, model.meals);
  return {cals:0, desc:'', showForm:false, editId:null, meals};
}
```


### Actions - Elm Pattern

```javascript
export const showFormF = (showForm) => ({
  type: 'SHOW_FORM',  showForm,
});
export const mealInput = (desc) => ({
  type: 'MEAL_INPUT',  desc,
});
export const calInput = (cals) => ({
  type: 'CALORIES_INPUT',  cals,
});
export const saveMeal = {type:'SAVE_MEAL'};

export const delMeal = (id) => ({
  type: 'DEL_MEAL',  id,
});
export const editMeal = (editId) => ({
  type: 'EDIT_MEAL',  editId,
});

const update = (msg, model) => {
  switch (msg.type) {
    case 'SHOW_FORM':
      const { showForm } = msg;
      return {...model, showForm};
    case 'MEAL_INPUT':
      const { desc } = msg;
      return {...model, desc};
    case 'CALORIES_INPUT':
      const { cals }  = msg;
      return {...model, cals};
    case 'SAVE_MEAL':
      const { editId } = model;
      return (editId) ? edit(model) : add(model);
    case 'DEL_MEAL':
      const { id } = msg;
      const meals = R.filter( meal => meal.id !== id, model.meals);
      return {...model, meals};
    case 'EDIT_MEAL': { // <- scoping vars
      const { editId } = msg;
      const meal = R.find( meal => meal.id === editId, model.meals);
      const { cals, desc } = meal;
      return {...model, desc, cals, editId, showForm:true};
    }
  }
  console.log('update default');
  return model;
}

const add = (model) => {
  const { nextId, cals, desc } = model;
  const meal = { id: nextId, cals, desc };
  const meals = [...model.meals, meal];
  return {...model, cals:0, desc:'', showForm:false, nextId:nextId+1, meals};
}
const edit = (model) => {
  const { editId, cals, desc } = model;
  const meals = R.map( meal => {
      if (meal.id === editId)
        return {...meal, cals, desc};
      return meal;
    }, model.meals);
  return {...model, cals:0, desc:'', showForm:false, editId:null, meals};
}
```


### Reaction Mechanism - Elm Pattern

```javascript
function app(initModel, update, view, node) {
  let model = initModel;
  let curView = view(actions, model);
  let rootNode = createElement(curView);
  node.appendChild(rootNode);

  function actions(msg) {
    model = update(msg, model);
    const updatedView = view(actions, model);
    const patches = diff(curView, updatedView);
    rootNode = patch(rootNode, patches);
    curView = updatedView;
  }
}
```

### Reaction Mechanism - Meiosis Pattern

```javascript
const update = stream();
const states = stream.scan(P, app.initialState, update);
const actions = app.actions(update, app.initialState);
```
