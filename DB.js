import * as FileSystem from "expo-file-system";

export const dbDirectory = FileSystem.documentDirectory + "SQLite/";
export const dbName = "docdate.db";
export const dbPath = dbDirectory + dbName;
