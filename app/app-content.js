import React from "react";
import { connect } from "react-redux";
import { createRootNavigator } from "./router";
import navigationService from "./services/navigation-service";

import { authActions } from "./reducers/auth";
import { credenciadosActions } from "./reducers/credenciados";
import { eventosActions } from "./reducers/eventos";

class AppContent extends React.Component {

  constructor(props) {
    super(props);
    // this._forceReset();
  }

  _forceReset = () => {
    console.log("resetando tudo");
    const { authReset, credenciadosReset, eventosReset } = this.props;
    authReset();
    credenciadosReset();
    eventosReset();
  };

  render() {
    
    const { isSignedIn, hasActiveEvent } = this.props;
    const Layout = createRootNavigator(isSignedIn, hasActiveEvent);

    return (
      <Layout ref={navigatorRef => { 
        navigationService.setTopLevelNavigator(navigatorRef)
      }} />
    )
  }

}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  hasActiveEvent: state.auth.hasActiveEvent,
});

const mapDispatchToProps = dispatch => ({

  authReset: () => dispatch(authActions.reset()),
  credenciadosReset: () => dispatch(credenciadosActions.reset()),
  eventosReset: () => dispatch(eventosActions.reset()),

  fetchListaFromStart: () => dispatch(credenciadosActions.fetchListaFromStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);