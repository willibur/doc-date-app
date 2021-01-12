import React from "react";
import { ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";
import {
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
import { storeUserData, readUserData } from "../userData.js";
import { mainCol } from "../styles";

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
    navigation.navigate("Checkup", {
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
          <Text style={gender == "female" ? { color: mainCol } : {}}>
            weiblich
          </Text>
        </Left>
        <Right>
          <Radio
            color={mainCol}
            selectedColor={mainCol}
            selected={gender == "female"}
            onPress={() => setGender("female")}
          />
        </Right>
      </ListItem>
      <ListItem selected={gender == "male"} onPress={() => setGender("male")}>
        <Left>
          <Text style={gender == "male" ? { color: mainCol } : {}}>
            männlich
          </Text>
        </Left>
        <Right>
          <Radio
            color={mainCol}
            selectedColor={mainCol}
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
      <Button
        style={{ backgroundColor: mainCol }}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: "#ffffff" }}>Geburtsdatum ändern</Text>
      </Button>
      {showDatePicker && (
        <DateTimePicker
          maximumDate={new Date(2002, 12, 31)}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="calendar"
          color={{ mainCol }}
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
    <Appbar.Header style={{ backgroundColor: mainCol }}>
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
