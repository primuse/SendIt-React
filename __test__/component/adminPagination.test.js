import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AdminPagination from '../../src/components/adminPagination.jsx';

global.Headers = () => { };

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      firstName: 'Tiku',
      lastName: 'Okoye',
      registered: '22-03-2019',
      email: 'cim@gmail.com'
    },
  },
  users: {
    allUsers: [],
    show: false
  },
  parcel: {
    parcels: [
      {
        id: 1,
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      },
      {
        id: 2,
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      }
    ],
    createdParcels: [],
    deliveredParcels: [],
    inTransitParcels: [],
    canceledParcels: [],
    pages: 3
  }
};

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);


describe('Admin Pagination Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <AdminPagination />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});