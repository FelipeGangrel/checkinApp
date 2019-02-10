import React from "react";
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store";
import AppContent from "./app-content";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isLoading: false })
  }

  render() {
    const { isLoading } = this.state;

    const Content = isLoading ? <AppLoading /> : <AppContent />;

    return (
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor } >
          <Root>
            <ActionSheetProvider>
              { Content }
            </ActionSheetProvider>
          </Root>
        </PersistGate>
      </Provider>
    )
  }
  
}

