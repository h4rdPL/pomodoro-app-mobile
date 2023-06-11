import React, { createContext, useState, useEffect } from "react";

import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);

  const initializeDatabase = async () => {
    const database = await SQLite.openDatabase("example.db");
    setDb(database);
    if (database) {
      getData(); // Fetch data after the database is initialized
    }
  };
  const addName = async (selectedTag, timerMode) => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO stats (tagSelected, timerMode) values (?, ?)",
          [selectedTag, timerMode]
        );
        getData(); // Fetch the updated data after inserting
        setCurrentName(undefined);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    if (!db) return;

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM stats",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows._array;
          setNames(rows);
        },
        (_, error) => console.log(error)
      );
    });
  };
  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, tagSelected TEXT, timerMode TEXT)",
          [],
          () => {
            setIsLoading(false);
            getData(); // Call getData to fetch the data
          },
          (txObj, error) => console.log(error)
        );
      });
    }
  }, [db]);

  return (
    <DatabaseContext.Provider value={{ db, names, addName }}>
      {children}
    </DatabaseContext.Provider>
  );
};
