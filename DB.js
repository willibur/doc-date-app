import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

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

export const getPossibleCheckups = (age, userData, setDbResult) => {
  console.log("Der letzte");
  const db = SQLite.openDatabase(dbName);
  db.readTransaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM checkups
                  INNER JOIN checkup_details ON checkups.checkup_details_id = checkup_details.id
                  INNER JOIN genders ON checkup_details.gender_id = genders.id  
                  WHERE ? BETWEEN age_min AND age_max 
                  AND (gender = 'both' OR gender = ?);`,
        [age, userData.gender],
        (_, results) => setDbResult(results.rows._array),
        (_, err) => console.error("Error in transaction", err)
      );
    },
    (err) => console.error("Error starting a transaction", err)
  );
};
