import React from "react";
import { connect } from "react-redux";
import { createRootNavigator } from "./router";
import navigationService from "./services/navigation-service";
import { credenciadosActions } from "./reducers/credenciados";
import { authActions } from "./reducers/auth";

class AppContent extends React.Component {

  constructor(props) {
    super(props);
    // this.props.authReset(); // resetar auth
  }

  render() {
    
    const { auth } = this.props;
    const isSignedIn = auth.isSignedIn;
    const hasActiveEvent = auth.hasActiveEvent;

    const Layout = createRootNavigator(isSignedIn, hasActiveEvent);

    return (
      <Layout ref={navigatorRef => { navigationService.setTopLevelNavigator(navigatorRef) }} />
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  authReset: () => dispatch(authActions.authReset()),
  fetchListaFromStart: () => dispatch(credenciadosActions.fetchListaFromStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);