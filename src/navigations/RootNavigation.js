import { createStackNavigator, createAppContainer } from "react-navigation";

import TodoList from './../screens/TodoList';

const MainNavigator = createStackNavigator({
  TodoList: {
    screen: TodoList,
    navigationOptions: ({ navigation }) => ({
      title: `Todo List App`,
    }),
  }
});

const RootNavigation = createAppContainer(MainNavigator);

export default RootNavigation;