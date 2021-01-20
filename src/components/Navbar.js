import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Notifications from "expo-notifications";

import { Profile } from "./Profile";
import { Checkup } from "./Checkup";
import { Calendar } from "./Calendar";
import { mainCol, theme } from "../styles";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const Navbar = () => {
  return (
    <NavigationContainer theme={theme}>
      <Navigator>
        <Screen
          name="Checkup"
          component={Checkup}
          options={{
            tabBarLabel: "Vorsorge",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="doctor" color={color} size={26} />
            ),
          }}
        />
        <Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: "Kalender",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
