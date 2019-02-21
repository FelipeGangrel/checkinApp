import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "../../colors";
import DrawerButton from "../../components/drawer-button";
import { eventosActions } from "../../reducers/eventos";
import EventoListItem from "../../components/preferences/evento-list-item";
import AmbienteListItem from "../../components/preferences/ambiente-list-item";

@connectActionSheet
class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Preferências",
    headerLeft: <DrawerButton navigation={navigation} />
  });

  state = {
    events: [],
    activeEvent: null,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { events, activeEvent } = this.props;
    this.setState({
      activeEvent,
      events
    });
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            <EventoListItem />
            <AmbienteListItem />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const mapStateToProps = state => ({
  events: state.eventos.events,
  activeEvent: state.eventos.activeEvent
});

const mapDispatchToProps = dispatch => ({
  swithActiveEvent: event => dispatch(eventosActions.swithActiveEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
