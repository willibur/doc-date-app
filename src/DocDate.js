import React from "react";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { Profile } from "./components/Profile";
import { Checkup } from "./components/Checkup";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as Notifications from "expo-notifications";

const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar } from "./components/Calendar";
import { mainCol } from "./styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DocDate = () => {
  return (
    <NavigationContainer
      theme={{ colors: { background: "#eeeeee", primary: mainCol } }}
    >
      <Tab.Navigator>
        <Tab.Screen
          style={{ backgroundColor: mainCol }}
          name="Checkup"
          component={Checkup}
          options={{
            tabBarLabel: "Vorsorge",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="doctor" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: "Kalender",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default DocDate;
