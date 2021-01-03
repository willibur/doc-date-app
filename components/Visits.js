import { View } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Text,
  Title,
} from "react-native-paper";
import { NewVisit } from "./NewVisit";

export const Visits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const modalContainerStyle = { backgroundColor: "white", padding: 20 };

  const newVisitModal = (
    <Provider>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={modalContainerStyle}
        >
          <NewVisit />
        </Modal>
      </Portal>
    </Provider>
  );

  const newVisitButton = (
    <Button style={{ marginTop: 30 }} onPress={showModal}>
      New
    </Button>
  );

  const appbar = (
    <Appbar.Header>
      <Appbar.Content
        title="Besuche"
        subtitle={"Meine Vorsorgeuntersuchungs-Termine"}
      />
    </Appbar.Header>
  );

  const content = (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      {appbar}
      <ScrollView>
        {newVisitButton}
        {content}
      </ScrollView>
      {newVisitModal}
    </View>
  );
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
