# Pattern Comparison

A small comparison between two frontend Design Pattern:
* the Elm architecture or pattern
* the Meiosis pattern.

Check out the branches.

https://github.com/giancarlocp/pattern-comparison/compare/elm...meiosis?expand=1

## Calorie Counting App

This is based on the calorieCounter App developed by @knowthen with the Elm pattern.
It is small but ilustrative App.

https://github.com/knowthen/fpjs/blob/master/caloriecounter/PLAN.md


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


### Data Model

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
