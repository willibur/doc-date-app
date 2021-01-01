import React from "react";
import { ScrollView } from "react-native";
import {
  DatePicker,
  Button,
  Left,
  Text,
  Right,
  Input,
  Item,
  ListItem,
  Radio,
} from "native-base";

export const Home = ({ navigation }) => {
  const [name, onChangeName] = React.useState("");

  const [gender, setGender] = React.useState("");

  const defaultDate = new Date(0);
  const [date, setDate] = React.useState(defaultDate);

  return (
    <ScrollView>
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

      <DatePicker
        defaultDate={new Date(2018, 4, 4)}
        maximumDate={new Date(2002, 12, 31)}
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
          navigation.navigate("File", {
            name: name,
            gender: gender,
            date: date,
          })
        }
      >
        <Text>Weiter</Text>
      </Button>
    </ScrollView>
  );
};
