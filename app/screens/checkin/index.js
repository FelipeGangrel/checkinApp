import { createStackNavigator } from "react-navigation";
import Home from "./home";
import Leitor from "./leitor";
import Credenciado from "./credenciado";
import VerificarEticket from "./verificar-eticket";

export default createStackNavigator({
  Home,
  Leitor,
  Credenciado,
  VerificarEticket,
});