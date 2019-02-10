import React from "react";
import { connect } from "react-redux";
import { createRootNavigator } from "./router";
import navigationService from "./services/navigation-service";
import { credenciadosActions } from "./reducers/credenciados";

class AppContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const { auth, fetchListaFromStart } = this.props;

    // fetchListaFromStart(); // usar para limpar o cache no maldito ios

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
  fetchListaFromStart: () => dispatch(credenciadosActions.fetchListaFromStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);