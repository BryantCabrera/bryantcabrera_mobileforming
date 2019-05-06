import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = (name) => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            //array of all the tabs you use
            tabs: [
                {
                    screen: "bryant-mobileforming.FindReservationScreen",
                    label: "Your Reservations",
                    title: "Your Reservations",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    },
                    passProps: {
                        name: name
                    }
                },
                {
                    screen: "bryant-mobileforming.CreateReservationScreen",
                    label: "Create Reservation",
                    title: "Create Reservation",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    },
                    passProps: {
                        name: name
                    }
                }
            ],
            //  lets you customize tab colors in iOS
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: "bryant-mobileforming.SideDrawer"
                }
            },
            //  lets you customize tab colors in Android
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            }
        });
    });
};

export default startTabs;