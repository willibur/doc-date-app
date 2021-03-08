import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import de from "moment/locale/de";
import * as React from "react";
import { Button, Card, Title } from "react-native-paper";
import { addNewVisit } from "../DB";
import * as Notifications from "expo-notifications";

import { mainCol, darkTextCol } from "../styles";
import { View } from "native-base";

export const NewVisit = ({ checkup, hide, userData }) => {
  moment.updateLocale("de", de);
  moment.locale("de");
  const now = moment(Date.now());
  const [date, setDate] = React.useState(now);
  const [showDatePicker, setShowDatePicker] = React.useState(true);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const insertCheckup = async () => {
    addNewVisit(date, checkup.id);
    await schedulePushNotification(
      `Hallo ${userData.name} dein nächster ${checkup.name}-Termin`,
      checkup.name,
      ` ist am ${date.format("LL")} um ${date.format("LT")} Uhr`,
      moment.duration(date.subtract(1, "days").diff(moment.now())).asSeconds()
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

async function schedulePushNotification(title, subtitle, body, inSeconds) {
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
    trigger: { seconds: inSeconds },
  });
}
