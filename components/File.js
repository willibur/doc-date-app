import React from "react";
import { ScrollView } from "react-native";
import {
  DatePicker,
  Card,
  CardItem,
  Left,
  Text,
  Body,
  View,
} from "native-base";
import { Appbar } from "react-native-paper";

import { getPossibleCheckups } from "../DB.js";
import { readUserData } from "./Profile.js";

export const File = ({ route }) => {
  const now = new Date();
  const [dbResult, setDbResult] = React.useState([]);

  React.useEffect(() => {
    console.log("Reading saved user");
    async function getDBData() {
      const userData = await readUserData();
      console.log("user data", userData);
      if (userData != null) {
        console.log("bd", userData);
        const birthdate = new Date(userData.birthdate);
        const age = now.getFullYear() - birthdate.getFullYear();
        getPossibleCheckups(age, userData, setDbResult);
      }
    }
    getDBData();
  }, []);

  const defaultDate = new Date(0);
  const [, setDate] = React.useState(defaultDate);

  const appbar = (
    <Appbar.Header>
      <Appbar.Content title="Akte" subtitle={"Meine Vorsorgeuntersuchungen"} />
      <Appbar.Action icon={"dots-vertical"} onPress={() => {}} />
    </Appbar.Header>
  );
  return (
    <View>
      {appbar}
      <ScrollView>
        <Text>{JSON.stringify(dbResult)}</Text>
        {dbResult.map((r) => (
          <Card key={r.name}>
            <CardItem header>
              <Text>{r.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{r.description}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Mein letzter Termin: </Text>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  placeHolderText="Termin wählen"
                  onDateChange={setDate}
                  disabled={false}
                />
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Mein nächster Termin:</Text>
              </Left>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};
