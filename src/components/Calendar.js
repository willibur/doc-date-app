import React from "react";
import { ScrollView } from "react-native";
import { View } from "native-base";
import { Avatar, Card } from "react-native-paper";
import { getVisits } from "../DB";
import { theme } from "../styles";
import { Headerbar } from "./Headerbar";
import moment from "moment";
import de from "moment/locale/de";

export const Calendar = () => {
  const [visits, setVisits] = React.useState([]);

  React.useEffect(() => {
    getVisits(setVisits);
  });

  moment.updateLocale("de", de);
  moment.locale("de");

  const content = visits.map((visit) => (
    <Card key={visit.id} style={{ marginBottom: 10 }}>
      <Card.Title
        title={`${moment(visit.date).format("LL")} um ${moment(
          visit.date
        ).format("LT")} Uhr`}
        subtitle={visit.name}
        left={LeftContent}
      />
    </Card>
  ));

  return (
    <View>
      <Headerbar title="Kalender" subtitle="Meine Termine" />
      <ScrollView style={{ paddingTop: 12, marginBottom: 70 }}>
        {content}
      </ScrollView>
    </View>
  );
};

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="clock" theme={theme} />
);
