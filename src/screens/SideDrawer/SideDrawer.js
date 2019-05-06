import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import App from "../../../App";

class SideDrawer extends Component {
    logout = () => {
        // this.props.navigator.push({
        //     screen: "bryant-mobileforming.AuthScreen"
        // });

        App();
    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    // Dimensions is a helper object that let’s us find out the dimensions of the device we’re running on
                    // Gets the window's dimensions
                    { width: Dimensions.get("window").width * 0.8 }
                ]}
            >
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

export default SideDrawer;