import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

import Login from "./screens/login";
import SelectEvent from "./screens/select-event";
import Main from "./navigators/main";

// export const Login = Login;
// export const SelectEvent = SelectEvent;
// export const Main = Main;

// vamos expor apenas esta função que decidirá qual navegação servir
export const createRootNavigator = (isSignedIn = false, hasActiveEvent = null) => {

  if (isSignedIn && hasActiveEvent) {
    initialRouteName = "Main";
  } else if (isSignedIn) {
    initialRouteName = "SelectEvent";
  } else {
    initialRouteName = "Login";
  }

  const switchNavigator = createSwitchNavigator(
    {
      Login,
      SelectEvent,
      Main,
    },
    {
      initialRouteName,
    }
  );

  const AppContainer = createAppContainer(switchNavigator);
  return AppContainer;
};
