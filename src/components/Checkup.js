import React from "react";
import { ScrollView } from "react-native";
import { View, ListItem } from "native-base";
import {
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Text,
  Icon,
  List,
} from "react-native-paper";

import { getPossibleCheckups } from "../DB.js";
import { useUserData, readUserData } from "../userData.js";
import { NewVisit } from "./NewVisits.js";
import { mainCol, theme } from "../styles";
import { Headerbar } from "./Headerbar";
import { useIsFocused } from "@react-navigation/native";

export const Checkup = () => {
  //eigener Hook, lädt Eingabedaten vom Profil Name, Alter, Geschlecht
  const userData = useUserData();

  //in checkups wird die Vorsorge die der User machen könnte gespeichert
  const [checkups, setCheckups] = React.useState([]);

  // Quelle: https://reactnavigation.org/docs/use-is-focused/
  // Wenn die Seite angezeigt wird, isFocused=true d.h. die Seite wird neu gerendert
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (userData != null && isFocused) {
      const birthdate = new Date(userData.birthdate);
      const now = new Date();
      const age = now.getFullYear() - birthdate.getFullYear();
      getPossibleCheckups(age, userData, setCheckups);
    }
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

  const newVisitModal = (
    <Provider>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{ padding: 20 }}
        >
          {
            <NewVisit
              checkup={checkupForVisit}
              hide={hideModal}
              userData={userData}
            />
          }
        </Modal>
      </Portal>
    </Provider>
  );

  return (
    <View>
      <Headerbar
        title="Vorsorge"
        subtitle={
          userData ? `Meine Vorsorgeuntersuchungen` : `Vorsorgeuntersuchungen`
        }
      />
      <ScrollView style={{ paddingTop: 12, marginBottom: 70 }}>
        {checkups.map((checkup) => (
          <Card style={{ marginBottom: 12 }} key={checkup.id}>
            <Card.Title
              title={checkup.name}
              subtitle={
                checkup.age_max == 150 // es gibt kein Höchstalter
                  ? `Ab ${checkup.age_min} Jahre: ${checkup.interval}`
                  : `Zwischen ${checkup.age_min} und ${checkup.age_max} Jahre: ${checkup.interval}`
              }
            />
            <Card.Content>
              <Paragraph>{checkup.description}</Paragraph>

              <List.Accordion
                style={{ padding: 0, marginTop: 4, marginBottom: 8 }}
                theme={theme}
                title="Details"
                left={(props) => (
                  <List.Icon
                    {...props}
                    style={{ margin: 0, marginLeft: -10 }}
                    icon="information-outline"
                  />
                )}
              >
                {checkup.details.split("$").map((detail) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginBottom: 8,
                      marginLeft: -40,
                    }}
                  >
                    <View style={{ marginTop: 2 }}>
                      <Text>{"\u25cf"}</Text>
                    </View>
                    <Paragraph
                      style={{
                        marginLeft: 6,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text>{detail}</Text>
                    </Paragraph>
                  </View>
                ))}
              </List.Accordion>
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
      {newVisitModal}
    </View>
  );
};
