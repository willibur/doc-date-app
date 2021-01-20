import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import de from "moment/locale/de";
import * as React from "react";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import { addNewVisit } from "../DB";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { mainCol, darkTextCol, theme } from "../styles";
import { View } from "native-base";

export const NewVisit = ({ checkup, hide }) => {
  moment.updateLocale("de", de);
  moment.locale("de");
  const now = moment(Date.now());
  const [date, setDate] = React.useState(now);
  const [showDatePicker, setShowDatePicker] = React.useState(true);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const insertCheckup = async () => {
    addNewVisit(date, checkup.id);
    await schedulePushNotification(
      `${checkup.name}-Termin`,
      checkup.name,
      `${date.format("LL")} um ${date.format("LT")} Uhr`
    );
    hide();
  };

  const datePicker = (
    <>
      {(showDatePicker || showTimePicker) && (
        <DateTimePicker
          value={date.toDate()}
          mode={showDatePicker ? "date" : "time"}
          is24Hour={true}
          dismiss={() => {}}
          display="default"
          onChange={(event, date) => {
            if (date !== undefined) {
              {
                if (showDatePicker) {
                  setShowDatePicker(false);
                  setDate(moment(date));
                  setShowTimePicker(true);
                } else if (showTimePicker) {
                  setShowTimePicker(false);
                  setDate(moment(date));
                }
              }
            }
          }}
        />
      )}
    </>
  );

  const card = (
    <Card style={{ marginBottom: 12 }} key={checkup.id}>
      <Card.Title
        title={`Am ${date.format("LL")} um ${date.format("LT")} Uhr`}
        subtitle={date.fromNow()}
      />
      <Card.Content>
        <Title>Termin für {checkup.name}</Title>
      </Card.Content>
      <Card.Cover
        source={{
          uri: "https://source.unsplash.com/LPRrEJU2GbQ/400x200",
        }}
      />
      <Card.Actions style={{ alignSelf: "flex-end" }}>
        <Button
          onPress={() => {
            setShowDatePicker(true);
          }}
          color={darkTextCol}
        >
          Ändern
        </Button>
        <Button color={mainCol} onPress={async () => await insertCheckup()}>
          Eintragen
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      {datePicker}
      {card}
    </View>
  );
};

async function schedulePushNotification(title, subtitle, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: {
        title,
        message: body,
        subtitle,
        sound: true,
        vibrate: true,
        priority: "high",
      },
    },
    trigger: { seconds: 2 }, // TODO: Set correct date
  });
}
