import React from "react";
import { ScrollView } from "react-native";
import { Appbar } from "react-native-paper";

import {
  Button,
  Left,
  Text,
  Right,
  Input,
  Item,
  ListItem,
  Radio,
  View,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToolbarAndroid from "@react-native-community/toolbar-android";

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

export const Profile = ({ navigation }) => {
  const [name, setName] = React.useState("");

  const [gender, setGender] = React.useState("");

  const defaultDate = new Date();
  const [date, setDate] = React.useState(defaultDate);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const dataIncomplete = name === "" || gender === "" || date === null;

  // Mit useEffect nur einmal am Anfang existierendes Profil laden
  React.useEffect(() => {
    console.log("Reading saved user");
    // async geht nur wenn man hier eine funktion erstellt
    // und sofort aufruft https://github.com/facebook/react/issues/14326
    async function fillInExistingUser() {
      const userData = await readUserData();
      if (userData != null) {
        setName(userData.name);
        setGender(userData.gender);
        console.log("Read user", userData.birthdate, typeof userData.birthdate);
        setDate(new Date(userData.birthdate));
      }
    }
    fillInExistingUser();
  }, []);

  const save = () => {
    storeUserData({
      name: name,
      gender: gender,
      birthdate: date.getTime(),
    });
    navigation.navigate("File", {
      name: name,
      gender: gender,
      date: date,
    });
  };
  const nameInput = (
    <Item rounded>
      <Input placeholder="Name" value={name} onChangeText={setName} />
    </Item>
  );

  const genderInput = (
    <>
      <ListItem
        selected={gender == "female"}
        onPress={() => setGender("female")}
      >
        <Left>
          <Text>weiblich</Text>
        </Left>
        <Right>
          <Radio
            color={"#f0ad4e"}
            selectedColor={"#5cb85c"}
            selected={gender == "female"}
            onPress={() => setGender("female")}
          />
        </Right>
      </ListItem>
      <ListItem selected={gender == "male"} onPress={() => setGender("male")}>
        <Left>
          <Text>männlich</Text>
        </Left>
        <Right>
          <Radio
            color={"#f0ad4e"}
            selectedColor={"#5cb85c"}
            selected={gender == "male"}
            onPress={() => setGender("male")}
          />
        </Right>
      </ListItem>
    </>
  );

  const birthdateInput = (
    <>
      <Text>{date !== defaultDate && `${date.toLocaleDateString()}`}</Text>
      <Button onPress={() => setShowDatePicker(true)}>
        <Text>Geburtsdatum ändern</Text>
      </Button>
      {showDatePicker && (
        <DateTimePicker
          maximumDate={new Date(2002, 12, 31)}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="calendar"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date !== undefined) {
              setDate(date);
            }
          }}
        />
      )}
    </>
  );

  const appbar = (
    <Appbar.Header>
      <Appbar.Content title="Profil" subtitle={"Meine Daten"} />
      <Appbar.Action icon={"content-save"} onPress={save} />
    </Appbar.Header>
  );
  return (
    <View>
      {appbar}
      <ScrollView>
        {nameInput}
        {genderInput}
        {birthdateInput}
      </ScrollView>
    </View>
  );
};
