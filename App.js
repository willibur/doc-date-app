import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import DocDate from "./DocDate";
import { dbDirectory, dbPath } from "./DB.js";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });

    // Datenbank vom dem asset-Ordner in den Ordner auf dem Android Gerät kopieren
    // So findet SQLite.openDatabase die Datenbank

    // Ordner erstellen
    try {
      await FileSystem.makeDirectoryAsync(dbDirectory);
    } catch (error) {
      // Ignorieren, wenn es diesen Ordner schon gibt
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./assets/docdate.db")).uri,
      dbPath
    );

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <DocDate />
      </Container>
    );
  }
}
