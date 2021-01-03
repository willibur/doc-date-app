import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export const NewVisit = ({ visible, setVisible }) => {
  const defaultDate = Date.now();
  const [date, setDate] = React.useState(defaultDate);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedVisit, setSelectedVisit] = React.useState(null);

  const birthdateInput = (
    <>
      <Button onPress={() => setShowDatePicker(true)}>
        <Text>{date !== defaultDate && `${date.toLocaleDateString()}`}</Text>
      </Button>
      <Picker
        selectedValue={selectedVisit}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedVisit({ language: itemValue })
        }
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      {showDatePicker && (
        <DateTimePicker
          maximumDate={new Date(2002, 12, 31)}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="calendar"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date !== undefined) {
              setDate(date);
            }
          }}
        />
      )}
    </>
  );

  return birthdateInput;
};
