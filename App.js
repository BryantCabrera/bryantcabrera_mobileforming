import { Navigation } from "react-native-navigation";
import apolloHOC from './src/components/ApolloHOC/ApolloHOC';

import AuthScreen from "./src/screens/Auth/Auth";
import CreateReservationScreen from "./src/screens/CreateReservation/CreateReservation";
import FindReservationScreen from "./src/screens/FindReservation/FindReservation";
import ReservationDetailScreen from "./src/screens/ReservationDetail/ReservationDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

// Registers screens
Navigation.registerComponent(
    //this string is a unique identifier of that string, you can choose anything you want (app name.ScreenName)
    "bryant-mobileforming.AuthScreen",
    () => AuthScreen
);
Navigation.registerComponent(
    "bryant-mobileforming.CreateReservationScreen",
    () => apolloHOC(CreateReservationScreen)
);
Navigation.registerComponent(
    "bryant-mobileforming.FindReservationScreen",
    () => apolloHOC(FindReservationScreen)
);
Navigation.registerComponent(
    "bryant-mobileforming.ReservationDetailScreen",
    () => ReservationDetailScreen
);
Navigation.registerComponent(
    "bryant-mobileforming.SideDrawer",
    () => SideDrawer
);

// lets us import App.js in other files
export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "bryant-mobileforming.AuthScreen",
        title: "Login"
    }
});