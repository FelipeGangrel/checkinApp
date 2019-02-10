import { createStackNavigator } from "react-navigation";
import Home from "./home";
import Leitor from "./leitor";
import Credenciado from "./credenciado";
import QrCodeProcessing from "./qr-code-processing";

export default createStackNavigator({
  Home,
  Leitor,
  Credenciado,
  QrCodeProcessing,
});