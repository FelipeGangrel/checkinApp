import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView, DrawerItems} from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { authActions } from "../../reducers/auth";
import { colors } from "../../colors";

class DrawerContent extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleSignOut () {
    const { signOutUser } = this.props;
    signOutUser();
  }
  
  render () {

    const { auth } = this.props;

    return (
      <ScrollView contentContainerStyle={{ flex: 1,  flexDirection: 'column', justifyContent: 'space-between'}}>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", horizontal:"never" }}>
          <View style={styles.header}>
            <View>
              <Text style={{ fontSize: 14 }}>{auth.user.nome}</Text>
              <Text style={{ fontSize: 12, color: "#999" }}>{auth.user.email}</Text>
            </View>
          </View>
          <DrawerItems { ...this.props } style={{ backgroundColor: "red" }} />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={ () =>  this._handleSignOut()}>
              <View style={styles.item}>
                <View style={styles.iconContainer}>
                  <AntDesign name="logout" />
                </View>
                <Text style={styles.label}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: -4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDisatchToProps = dispatch => ({
  signInUser: user => dispatch(authActions.signInUser(user)),
  signOutUser: () => dispatch(authActions.signOutUser()),
});

export default connect(mapStateToProps, mapDisatchToProps)(DrawerContent);

