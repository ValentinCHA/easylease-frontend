import React from 'react';
import AllScenario from '../components/AllScenario';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-fetch-mock';
import { act } from '@testing-library/react-hooks';

const store = createStore(rootReducer);

describe('AllScenario component', () => {
  it('should display the navbar and header with the name "Scénarios"', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <AllScenario />
      </Provider>
    );
    expect(getAllByText('Scénarios')).toHaveLength(2);
  });
  

  it('should display a search field that updates the app state when typed in', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AllScenario />
      </Provider>
    );
    const searchField = getByPlaceholderText('Chercher un scenario...');
    fireEvent.change(searchField, { target: { value: 'test' } });
    expect(searchField.value).toBe('test');
  });

  // it('should call the API with the user token when mounted and update its state accordingly', async () => {
  //   // We can use the `mock` function from Jest to mock the API call
  //   jest.mock('../reducers/scenario', () => ({
  //     ...jest.requireActual('../reducers/scenario'), // this will use the actual implementation of the other functions in the module
  //     getScenarios: jest.fn().mockResolvedValue({
  //       result: true,
  //       userInfos: {
  //         scenarios: [
  //           {
  //             _id: '123',
  //             name: 'Test scenario 1',
  //             description: 'Description for test scenario 1',
  //             // other properties for the scenario
  //           },
  //           {
  //             _id: '456',
  //             name: 'Test scenario 2',
  //             description: 'Description for test scenario 2',
  //             // other properties for the scenario
  //           },
  //         ],
  //       },
  //     }),
  //   }));
  
  //   const { findByText } = render(
  //     <Provider store={store}>
  //       <AllScenario />
  //     </Provider>
  //   );
  
  //   // Now we can check that the mock function was called with the correct arguments
  //   await findByText('Test scenario 1');
  //   expect(getScenarios).toHaveBeenCalledWith(user.token);
  // });
  
  
  // it('should filter scenarios correctly based on the search field value and display the matching scenarios', () => {
  //   const { getByPlaceholderText, getByText } = render(
  //     <Provider store={store}>
  //       <AllScenario />
  //     </Provider>
  //   );
  //   const searchField = getByPlaceholderText('Chercher un scenario...');
  //   fireEvent.change(searchField, { target: { value: 'Test scenario 1' } });
  //   expect(getByText('Test scenario 1')).toBeInTheDocument();
  //   expect(getByText('Test scenario 2')).not.toBeInTheDocument();
  // });
  
//   it('should display a Scenario component for each scenario in the filtered scenarios array', () => {
//     const { getByText } = render(
//       <Provider store={store}>
//         <AllScenario />
//       </Provider>
//     );
//     expect(getByText('Test scenario 1')).toBeInTheDocument();
//   });
  
//   it('should update the app state using the removeId function and redirect to the "newScenario" page when the "Nouveau scénario" button is clicked', () => {
//     const { getByText } = render(
//       <Provider store={store}>
//         <AllScenario />
//       </Provider>
//     );
//     fireEvent.click(getByText('Nouveau scénario'));
//     // We can use the `useDispatch` hook and the `dispatch` function from the mock store to check that the removeId action was dispatched
//     expect(store.dispatch).toHaveBeenCalledWith(removeId());
//     // We can use the `useRouter` hook and the `push` function from the mock router to check that the component redirected
//     expect(router.push).toHaveBeenCalledWith('/newScenario');
// });  
});
