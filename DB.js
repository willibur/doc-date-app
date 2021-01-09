import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export const dbDirectory = FileSystem.documentDirectory + "SQLite/";
export const dbName = "docdate.db";
export const dbPath = dbDirectory + dbName;

export const addNewVisit = (visitDate, checkupId) => {
  const db = SQLite.openDatabase(dbName);
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO visits (date, checkup_id) VALUES (?, ?);`,
        [visitDate.toISOString(), checkupId],
        () => {},
        (_, err) => {
          console.error("Error in transaction", err);
        }
      );
    },
    (err) => {
      console.error("Error starting a transaction", err);
    }
  );
};

export const getVisits = (setDbResult) => {
  const db = SQLite.openDatabase(dbName);
  db.readTransaction(
    (tx) => {
      tx.executeSql(
        `SELECT visits.id, date, name FROM visits
            INNER JOIN checkups ON visits.checkup_id = checkups.id
            INNER JOIN checkup_details ON checkups.checkup_details_id = checkup_details.id;`,
        [],
        (_, results) => {
          setDbResult(results.rows._array);
        },
        (_, err) => console.error("Error in transaction", err)
      );
    },
    (err) => console.error("Error starting a transaction", err)
  );
};

export const getPossibleCheckups = (age, userData, setDbResult) => {
  const db = SQLite.openDatabase(dbName);
  db.readTransaction(
    (tx) => {
      tx.executeSql(
        `SELECT checkups.id, age_min, age_max, description, interval, name FROM checkups
                  INNER JOIN checkup_details ON checkups.checkup_details_id = checkup_details.id
                  INNER JOIN genders ON checkup_details.gender_id = genders.id  
                  WHERE ? BETWEEN age_min AND age_max 
                  AND (gender = 'both' OR gender = ?);`,
        [age, userData.gender],
        (_, results) => {
          setDbResult(results.rows._array);
        },
        (_, err) => console.error("Error in transaction", err)
      );
    },
    (err) => console.error("Error starting a transaction", err)
  );
};
