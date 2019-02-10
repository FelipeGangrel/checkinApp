import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";
import CredenciadosList from "../../components/checkin/credenciados-list";
import DrawerButton from "../../components/drawer-button";
import CredenciadosSearch from "../../components/checkin/credenciados-search";
import { credenciadosActions } from "../../reducers/credenciados";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Credenciados",
    headerLeft: <DrawerButton navigation={navigation} />,
    headerRight: navigation.getParam("headerRight")
  });

  constructor(props) {
    super(props);
    this.state = {
      qrReaderOpen: false
    };
  }

  componentDidMount() {

    const { isLoading } = this.props;

    this.props.navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={this._handleRefreshButton}>
          <EvilIcons
            name="refresh"
            size={35}
            color={ isLoading ? "red" : "black" }
            style={{ marginHorizontal: 15 }}
          />
        </TouchableOpacity>
      )
    });
  }

  _handleRefreshButton = () => {
    const { fetchListaFromStart, isLoading } = this.props;
    if (!isLoading) fetchListaFromStart();
  };

  _onOpenCredenciado = credenciado => {
    const { navigation } = this.props;
    navigation.navigate("Credenciado", { credenciado });
  };

  render() {

    const { isLoading } = this.props;

    const loadingIndicator = isLoading
      ? <View style={{ paddingVertical: 10 }}>
          <ActivityIndicator animating={isLoading} size="large" />
        </View>
      : <View />;

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          
          <CredenciadosSearch />
          <CredenciadosList onOpenCredenciado={this._onOpenCredenciado} />
          { loadingIndicator }
          <TouchableOpacity
            style={styles.fab}
            onPress={() => {
              this.props.navigation.navigate("Leitor");
            }}
          >
            <Ionicons size={30} name="md-qr-scanner" color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.primary.base,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    // ios
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowColor: "black",
    shadowRadius: 5,
    // android
    elevation: 5
  }
});

const mapStateToProps = state => ({
  credenciados: state.credenciados,
  isLoading: state.credenciados.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchLista: () => dispatch(credenciadosActions.fetchLista()),
  fetchListaFromStart: () => dispatch(credenciadosActions.fetchListaFromStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
