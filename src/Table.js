import hh from 'hyperscript-helpers';
import * as R from 'rambda';
import m from 'mithril';


const { div, i, table, thead, tbody, tr, th, td} = hh(m);

const t = (tag, className, value, onclick=null) => tag({className, onclick}, value);

const mealHeader =
  thead([
    tr([
      t(th,'pa2 tl b', 'Meal'),
      t(th,'pa2 tr b', 'Calories'),
      t(th,'', '' ),
    ])
  ]);

const mealRow = R.curry( (className, actions, meal) =>
  tr( {className}, [
    t(td,'pa2'   , meal.desc ),
    t(td,'pa2 tr', meal.cals ),
    t(td,'pa2 tr', [
        t(i,'ph1 fa fa-trash-alt pointer', '',
            (e) => actions.delMeal(meal.id) ),
        t(i,'ph1 fa fa-edit pointer', '',
            (e) => actions.editMeal(meal.id) ),
    ]),
  ])
);
const totalRow = (meals) => {
  const total = R.pipe(
      R.map(meal => meal.cals),
      R.reduce( (acc,cals) => acc+cals, 0 ),
    )(meals);
  return tr( {className:'bt b'}, [
    t(td,'pa2 tr', 'Total:'),
    t(td,'pa2 tr',  total),
    t(td,'', '' ),
  ]);
}
const mealsBody = (className, actions, meals) => {
  const rows = R.map( mealRow('stripe-dark',actions), meals );
  const rowsWithTotal = [...rows, totalRow(meals)];
  return tbody( {className}, rowsWithTotal);
}
const tableView = (actions, meals) => {
  if (meals.length === 0)
    return t(div,'mv2 i black-50', 'No meals to display...');
  return table( {className:'mv2 w-100 collapse'}, [
      mealHeader,
      mealsBody('', actions, meals),
  ]);
}

export default tableView;
