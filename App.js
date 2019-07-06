// import React, { Fragment } from 'react';
// import { Provider } from 'react-redux';

// import { store } from './src/redux/store';
// import TodoList from './src/screens/TodoList';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <TodoList />
//     </Provider>
//   );
// };

// export default App;




import React, { Component } from 'react';;
import { Provider, connect } from 'react-redux';
import { createReduxContainer } from 'react-navigation-redux-helpers';

import RootNavigation from './src/navigations/RootNavigation';
import { store } from './src/redux/store';

const AppNav = createReduxContainer(RootNavigation, 'root');

const mapStateToProps = state => ({
  state: state.router
});

const AppWithNavigationState = connect(mapStateToProps)(AppNav);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}