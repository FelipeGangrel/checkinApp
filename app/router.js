import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

import Login from "./screens/login";
import SelectEvent from "./screens/select-event";
import Main from "./navigators/main";

// vamos expor apenas esta função que decidirá qual navegação servir
export const createRootNavigator = (isSignedIn = false, hasActiveEvent = null) => {

  console.log('createRootNavigator()');

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
