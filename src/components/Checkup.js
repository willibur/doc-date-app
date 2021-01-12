import React from "react";
import { ScrollView } from "react-native";
import { View } from "native-base";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";

import { getPossibleCheckups } from "../DB.js";
import { useUserData } from "../userData.js";
import { NewVisit } from "./NewVisits.js";
import { mainCol, theme } from "../styles";

export const Checkup = ({ route }) => {
  const [dbResult, setDbResult] = React.useState([]);
  const userData = useUserData();

  React.useEffect(() => {
    console.log("Reading saved user");
    async function getDBData() {
      console.log("user datagurke", userData);
      if (userData != null) {
        const birthdate = new Date(userData.birthdate);
        const now = new Date();
        const age = now.getFullYear() - birthdate.getFullYear();
        getPossibleCheckups(age, userData, setDbResult);
      }
    }
    getDBData();
  }, [userData]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [checkupForVisit, setCheckupForVisit] = React.useState(null);
  const showModal = (checkup) => {
    setCheckupForVisit(checkup);
    setModalVisible(true);
  };
  const hideModal = () => setModalVisible(false);
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

  const appbar = (
    <Appbar.Header style={{ backgroundColor: mainCol }}>
      <Appbar.Content title="Vorsorge" subtitle={"Meine Untersuchungen"} />
      <Appbar.Action icon={"dots-vertical"} onPress={() => {}} />
    </Appbar.Header>
  );
  return (
    <View>
      {appbar}
      <ScrollView style={{ paddingTop: 12, marginBottom: 70 }}>
        {dbResult.map((checkup) => (
          <Card style={{ marginBottom: 12 }} key={checkup.id}>
            <Card.Title
              //left={LeftContent}
              title={checkup.name}
              subtitle={
                checkup.age_max == 150
                  ? `Ab ${checkup.age_min} Jahre: ${checkup.interval}`
                  : `Zwischen ${checkup.age_min} und ${checkup.age_max}: ${checkup.interval}`
              }
            />
            <Card.Content>
              <Paragraph>{checkup.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
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

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="folder" theme={theme} />
);
