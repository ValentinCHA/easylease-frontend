import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Scenario from '../components/Scenario';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import rootReducer from '../reducers/rootReducer';
import { addId } from '../reducers/scenario';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const store = createStore(rootReducer);

const scenario = {
  _id: '123',
  client: { name: 'Test client' },
  name: 'Test scenario',
  amount: 1000,
  creationDate: '2022-01-01',
  // other scenario properties
};

it('should display the scenario information correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Scenario {...scenario} />
    </Provider>
  );
  expect(getByText(scenario.client.name).textContent).toEqual(scenario.client.name);
  expect(getByText(scenario.name).textContent).toEqual(scenario.name);
  expect(getByText(`${scenario.amount}€`).textContent).toEqual(`${scenario.amount}€`);
  expect(getByText(scenario.creationDate.substring(0, 10)).textContent).toEqual(
    scenario.creationDate.substring(0, 10)
  );
});



// it('should dispatch the addId action ///and redirect to the "newScenario" page when the card is clicked///', () => {
//   const history = createMemoryHistory();
//   const { getByText } = render(
//     <Router history={history}>
//       <Provider store={store}>
//         <Scenario {...scenario} />
//       </Provider>
//     </Router>
//   );
//   const card = getByText(scenario.name);
//   act(() => {
//     fireEvent.click(card);
//   });
//   expect(store.getState().scenario.value).toEqual(scenario);
//   // expect(history.location.pathname).toEqual('/newScenario/${scenario._id}');
// });

