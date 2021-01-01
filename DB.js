import * as FileSystem from "expo-file-system";

export const dbDirectory = FileSystem.documentDirectory + "SQLite/";
export const dbName = "docdate.db";
export const dbPath = dbDirectory + dbName;

export const saveVisit = async (visitDate, checkupId) => {
  const db = SQLite.openDatabase(dbName);
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO visits (date, checkup_id) VALUES (?, ?);`,
      [visitDate.toISOString(), checkupId],
      null,
      console.error
    );
  }, console.error);
};
