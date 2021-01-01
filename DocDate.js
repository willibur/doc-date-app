import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { File } from "./components/File";

const Stack = createStackNavigator();

const DocDate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="File" component={File} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

export default DocDate;
