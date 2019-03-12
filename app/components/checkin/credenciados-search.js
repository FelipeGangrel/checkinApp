import _ from "lodash";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { colors } from "../../colors";
import { credenciadosActions } from "../../reducers/credenciados";

class CredenciadosSearch extends React.Component {
  state = {
    search: "",
  };

  constructor(props) {
    super(props);
    this._filterLista = _.debounce(this._filterLista.bind(this), 1000);
  }

  _updateSearch = search => {
    this.setState({
      search
    });
    this._filterLista();
  };
  
  _filterLista() {
    const { filterLista } = this.props;
    filterLista(this.state.search);
  }

  render() {
    const { search } = this.state;

    const containerStyle = Platform.OS === "ios" ? stylesIos.containerStyle : stylesAndroid.containerStyle;

    return (
      <SearchBar
        onChangeText={this._updateSearch}
        lightTheme
        round
        value={search}
        placeholder="Busca..."
        cancelButtonTitle="Cancelar"
        cancelIcon={false}
        containerStyle={[containerStyle, styles.containerStyle]}
        inputContainerStyle={styles.inputContainerStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    marginVertical: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: "transparent",
  },
  inputContainerStyle: {
    backgroundColor: colors.light.base,
  }
});

const stylesAndroid = StyleSheet.create({
  containerStyle: {
  },
});

const stylesIos = StyleSheet.create({
  containerStyle: {
  },
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  filterLista: filter => dispatch(credenciadosActions.filterLista(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CredenciadosSearch);
