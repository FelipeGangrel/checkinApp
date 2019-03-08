import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";

import Button from "../../components/button";
import { colors } from "../../colors";
import { authActions } from "../../reducers/auth";

class Home extends React.Component {

  state = {
    formUser: {
      email: "",
      senha: ""
    }
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { hasError, clearError } = this.props;
    if (hasError) {
      clearError();
      Alert.alert(
        "Ooops",
        "E-mail e/ou senha incorretos. Por vafor, cheque suas credenciais de acesso."
      );
    }
  }
  
  componentDidMount() {
    const { formUser } = this.props;
    this.setState({
      formUser
    });
  }
  
  _handleSignInUser = () => {
    const { formUser } = this.state;
    const { signInUser } = this.props;
    signInUser(formUser);
  };
  
  _isSignInButtonEnabled = () => {
    const { email, senha } = this.state.formUser;
    
    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    let isEmailValid = email !== null && exp.test(String(email).toLowerCase());
    let isSenhaValid = senha !== null && String(senha).length > 0;
    return isEmailValid && isSenhaValid;
  };
  
  render() {
    
    const { isLoading } = this.props;
  
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require("../../../assets/splash.png")} style={{width: '100%', height: '100%'}}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerScreen}>
              <View style={styles.containerForm}>
                <TouchableOpacity style={styles.itemInput}>
                  <TextInput
                    value={this.state.formUser.email}
                    onChangeText={email => {
                      let { formUser } = this.state;
                      formUser.email = email;
                      this.setState({
                        formUser
                      });
                    }}
                    placeholder="e-mail"
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="username"
                    style={styles.textInput}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemInput}>
                  <TextInput
                    value={this.state.formUser.senha}
                    onChangeText={senha => {
                      let { formUser } = this.state;
                      formUser.senha = senha;
                      this.setState({
                        formUser
                      });
                    }}
                    placeholder="senha"
                    placeholderTextColor="#FFFFFF"
                    textContentType="password"
                    secureTextEntry
                    style={styles.textInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexBasis: 100, alignSelf: "center", width: "80%" }}>
              <Button
                title="ENTRAR"
                block
                rounded
                large
                elevated
                isLoading={isLoading}
                disabled={!this._isSignInButtonEnabled()}
                variant="light"
                onPress={() => this._handleSignInUser()}
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  containerForm: {
    flex: 0.8,
    alignItems: "stretch",
    justifyContent: "center"
  },
  itemInput: {
    marginTop: 20,
    borderColor: colors.primary.base,
    borderWidth: 2,
    borderRadius: 50,
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  textInput: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18
  }
});

const mapStateToProps = state => ({
  formUser: state.auth.formUser,
  hasError: state.auth.hasError,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  signInUser: user => dispatch(authActions.signInUser(user)),
  clearError: () => dispatch(authActions.clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
