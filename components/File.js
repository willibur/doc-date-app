import React from "react";
import { ScrollView } from "react-native";
import { DatePicker, Card, CardItem, Left, Text, Body } from "native-base";

import * as SQLite from "expo-sqlite";

import { dbName } from "../DB.js";

export const File = ({ route }) => {
  const now = new Date();
  const age = now.getFullYear() - route.params.date.getFullYear();

  const [dbResult, setDbResult] = React.useState([]);
  React.useEffect(async () => {
    const db = SQLite.openDatabase(dbName);
    db.transaction((tx) => {
      // tx.executeSql(
      //   route.params.gender == "female"
      //     ? `SELECT * FROM checkups WHERE female = 1;`
      //     : `SELECT * FROM checkups WHERE male = 1;`,
      //   [],
      //   (_, results) => setDbResult(results.rows._array),
      //   (e) => setDbResult(e + "")
      // );
      tx.executeSql(
        `SELECT * FROM checkups
	      INNER JOIN checkup_details ON checkups.checkup_details_id = checkup_details.id
          INNER JOIN genders ON checkup_details.gender_id = genders.id  
          WHERE ? BETWEEN age_min AND age_max 
          AND (gender = 'both' OR gender = ?);`,
        [age, route.params.gender],
        (_, results) => setDbResult(results.rows._array),
        console.error
      );
    }, console.error);
  }, []);

  const defaultDate = new Date(0);
  const [, setDate] = React.useState(defaultDate);

  return (
    <ScrollView>
      <>
        <Text>
          Hallo {route.params.name}, du bist {age} Jahre alt.
        </Text>
        <Text>{JSON.stringify(dbResult)};</Text>
        {dbResult.map((r) => (
          <Card key={r.id}>
            <CardItem header>
              <Text>{r.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>//Your text here</Text>
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
                  placeHolderText="Select date"
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
      </>
    </ScrollView>
  );
};
