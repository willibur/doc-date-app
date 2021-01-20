import React from "react";
import { ScrollView } from "react-native";
import { View } from "native-base";
import {
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Text,
} from "react-native-paper";

import { getPossibleCheckups } from "../DB.js";
import { useUserData, readUserData } from "../userData.js";
import { NewVisit } from "./NewVisits.js";
import { mainCol, theme } from "../styles";
import { Headerbar } from "./Headerbar";
import { useIsFocused } from "@react-navigation/native";

export const Checkup = () => {
  const userData = useUserData();

  console.log("\n\n\n");
  console.log("User data is", userData);
  console.log("\n\n\n");
  const [dbResult, setDbResult] = React.useState([]);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function getDBData() {
      if (userData != null && isFocused) {
        console.log("Reading checkups for user", userData.name);
        const birthdate = new Date(userData.birthdate);
        const now = new Date();
        const age = now.getFullYear() - birthdate.getFullYear();
        getPossibleCheckups(age, userData, setDbResult);
      }
    }
    getDBData();
  }, [userData, isFocused]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [checkupForVisit, setCheckupForVisit] = React.useState(null);
  const showModal = (checkup) => {
    setCheckupForVisit(checkup);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const modalContainerStyle = { padding: 20 };

  const newVisitModal = (
    <Provider>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={modalContainerStyle}
        >
          {checkupForVisit && (
            <NewVisit checkup={checkupForVisit} hide={hideModal} />
          )}
        </Modal>
      </Portal>
    </Provider>
  );

  return (
    <View>
      <Headerbar
        title="Vorsorge"
        subtitle={
          userData
            ? `${userData.name}s Vorsorgeuntersuchungen`
            : `Vorsorgeuntersuchungen`
        }
      />
      <ScrollView style={{ paddingTop: 12, marginBottom: 70 }}>
        {dbResult.map((checkup) => (
          <Card style={{ marginBottom: 12 }} key={checkup.id}>
            <Card.Title
              title={checkup.name}
              subtitle={
                checkup.age_max == 150 // es gibt kein Höchstalter
                  ? `Ab ${checkup.age_min} Jahre: ${checkup.interval}`
                  : `Zwischen ${checkup.age_min} und ${checkup.age_max}: ${checkup.interval}`
              }
            />
            <Card.Content>
              <Paragraph>{checkup.description}</Paragraph>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://source.unsplash.com/8u_2imJaVQs/400x200",
              }}
            />
            <Card.Actions style={{ alignSelf: "flex-end" }}>
              <Button onPress={() => showModal(checkup)} color={mainCol}>
                Termin eintragen
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      {modalVisible && newVisitModal}
    </View>
  );
};
