import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Profile } from "./components/Profile";
import { File } from "./components/File";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DocDate = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
        <Tab.Screen
          name="File"
          component={File}
          options={{
            tabBarLabel: "Akte",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="folder" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default DocDate;
