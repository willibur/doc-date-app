import React from "react";
import { Text, View, Image, TextInput } from "react-native";

const App = () => {
  return (
    // <View>
    //   <Text>DocDate</Text>
    // </View>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Name</Text>
      <Text>Geschlecht</Text>
      <Text>Geburtsdatum</Text>
      <Image
        style={{ width: 400, height: 300 }}
        source={{
          uri:
            "https://programm.ard.de/sendungsbilder/original/265/1823822265.88569239-f3db-40cb-8b51-06d8af2d8459.jpg"
        }}
      />
    </View>
  );
};
export default App;