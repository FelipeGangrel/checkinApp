import React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import CredenciadoItem from "./credenciado-item";
import { credenciadosActions } from "../../reducers/credenciados";

class CredenciadosList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lista: []
    };
  }

  componentDidMount() {
    const { credenciados } = this.props;
    // se nossa lista de credenciados estiver vazia, realizar um fetch
    // para buscar os dados no servidor
    if (credenciados.lista.length < 1) {
      this._fetchLista();
    }
  }

  // realizar fetch no servidor
  _fetchLista = () => {
    const { fetchLista } = this.props;
    fetchLista();
  };

  // atualiza o status do credenciado em nossa store
  _updateCredenciado = credenciado => {
    const { updateCredenciado } = this.props;
    updateCredenciado(credenciado);
  };

  _openCredenciado = credenciado => {
    this.props.onOpenCredenciado(credenciado);
  };

  _renderItem = ({ item }) => (
    <CredenciadoItem
      onCredenciadoUpdate={this._updateCredenciado}
      onOpenCredenciado={this._openCredenciado}
      onPress={this._openCredenciado}
      credenciado={item}
    />
  );

  _keyExtractor = item => item.id;

  render() {
    const { credenciados } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={credenciados.lista}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._fetchLista}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  credenciados: state.credenciados
});

const mapDispatchToProps = dispatch => ({
  fetchLista: () => dispatch(credenciadosActions.fetchLista()),
  updateCredenciado: credenciado =>
    dispatch(credenciadosActions.updateCredenciado(credenciado))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CredenciadosList);
