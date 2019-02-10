import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { authActions } from "../../reducers/auth";

class User extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>{auth.user.nome}</Text>
        <Text>{auth.user.email}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  signinUser: user => dispatch(authActions.signinUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
