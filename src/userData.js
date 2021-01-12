import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserData = async (userData) => {
  try {
    // Javascript Objekt in String umwandeln mit JSON.stringify
    const userString = JSON.stringify(userData);
    await AsyncStorage.setItem("@user", userString);
    console.log("Stored user data", userData);
  } catch (e) {
    console.error("Fehler beim Schreiben der Nutzerdaten", e);
  }
};

export const readUserData = async () => {
  try {
    //  String in Javascript Objekt umwandeln mit JSON.parse
    const userString = await AsyncStorage.getItem("@user");
    return userString != null ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Fehler beim Lesen der Nutzerdaten", e);
  }
};

export const useUserData = () => {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    console.log("Reading saved user");
    async function run() {
      const newUserData = await readUserData();
      if (
        userData === null ||
        userData.age !== newUserData.age ||
        userData.name !== newUserData.name ||
        userData.gender !== newUserData.gender
      ) {
        setUserData(newUserData);
      } else {
      }
    }
    run();
  }, []);
  return userData;
};
