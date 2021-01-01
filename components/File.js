import React from "react";
import { ScrollView } from "react-native";
import { DatePicker, Card, CardItem, Left, Text, Body } from "native-base";

import * as SQLite from "expo-sqlite";

import { dbName } from "../DB.js";
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
        const db = SQLite.openDatabase(dbName);
        db.readTransaction(
          (tx) => {
            tx.executeSql(
              `SELECT * FROM checkups
                  INNER JOIN checkup_details ON checkups.checkup_details_id = checkup_details.id
                  INNER JOIN genders ON checkup_details.gender_id = genders.id  
                  WHERE ? BETWEEN age_min AND age_max 
                  AND (gender = 'both' OR gender = ?);`,
              [age, userData.gender],
              (_, results) => setDbResult(results.rows._array),
              (_, err) => console.error("Error in transaction", err)
            );
          },
          (err) => console.error("Error starting a transaction", err)
        );
      }
    }
    getDBData();
  }, []);

  const defaultDate = new Date(0);
  const [, setDate] = React.useState(defaultDate);

  return (
    <ScrollView>
      <Text>{JSON.stringify(dbResult)}</Text>
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
  );
};
