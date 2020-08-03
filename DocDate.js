import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DatePicker,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Button,
  Left,
  Text,
  Body,
  Right,
  Input,
  Item,
  ListItem,
  Radio,
  Footer,
  FooterTab,
} from "native-base";

import * as SQLite from "expo-sqlite";

import { dbName } from "./DB.js";

// const Overview = ({}) => {
//   return (
//     <Container>
//       <Header />
//       <Content>
//         <Card>
//           <CardItem>
//             <Icon active name="logo-googleplus" />
//             <Text>Vorsorgeuntersuchungen</Text>
//             <Right>
//               <Icon name="arrow-forward" />
//             </Right>
//           </CardItem>
//           <CardItem>
//             <Icon active name="logo-googleplus" />
//             <Text>Bonusheft</Text>
//             <Right>
//               <Icon name="arrow-forward" />
//             </Right>
//           </CardItem>
//           <CardItem>
//             <Icon active name="logo-googleplus" />
//             <Text>Impfungen</Text>
//             <Right>
//               <Icon name="arrow-forward" />
//             </Right>
//           </CardItem>
//         </Card>
//       </Content>
//       <Footer>
//         <FooterTab>
//           <Button vertical>
//             <Icon name="apps" />
//             <Text>Home</Text>
//           </Button>
//           <Button vertical>
//             <Icon name="camera" />
//             <Text>Akte</Text>
//           </Button>
//           <Button vertical active>
//             <Icon active name="navigate" />
//             <Text>Kalender</Text>
//           </Button>
//           <Button vertical>
//             <Icon name="person" />
//             <Text>Einstellungen</Text>
//           </Button>
//         </FooterTab>
//       </Footer>
//     </Container>
//   );
// };

const HomeScreen = ({ navigation }) => {
  const [name, onChangeName] = React.useState("");

  const [gender, setGender] = React.useState("");

  const defaultDate = new Date(0);
  const [date, setDate] = React.useState(defaultDate);

  return (
    //<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Container>
      <Header />
      <Content>
        <Item rounded>
          <Input placeholder="Name" value={name} onChangeText={onChangeName} />
        </Item>

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

        {/* <Text>Geschlecht</Text>
      <Text>weiblich</Text>
      <RadioButton
        value="female"
        status={gender === "female" ? "checked" : "unchecked"}
        onPress={() => setChecked("female")}
      />
      <Text>männlich</Text>
      <RadioButton
        value="male"
        status={gender === "male" ? "checked" : "unchecked"}
        onPress={() => setChecked("male")}
      /> */}

        <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          maximumDate={new Date(2002, 12, 31)}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          placeHolderText="Geburtsdatum wählen"
          onDateChange={setDate}
          disabled={false}
        />

        <Button
          disabled={
            name == "" ||
            gender == "" ||
            date.toString() == defaultDate.toString()
          }
          onPress={() =>
            navigation.navigate("Second", {
              name: name,
              gender: gender,
              date: date,
            })
          }
        >
          <Text>Weiter</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button>
            <Text>Home</Text>
          </Button>
          <Button>
            <Text>Akte</Text>
          </Button>
          <Button active>
            <Text>Navigate</Text>
          </Button>
          <Button>
            <Text>Einstellungen</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const SecondScreen = ({ route }) => {
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
  const [date, setDate] = React.useState(defaultDate);

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

const Stack = createStackNavigator();

const DocDate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Overview" component={Overview} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DocDate;
