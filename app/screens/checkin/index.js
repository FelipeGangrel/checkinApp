import { createStackNavigator } from "react-navigation";
import Home from "./home";
import Leitor from "./leitor";
import Credenciado from "./credenciado";

export default createStackNavigator({
  Home,
  Leitor,
  Credenciado,
});