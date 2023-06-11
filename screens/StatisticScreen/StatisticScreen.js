import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { DatabaseContext } from "../../context/databaseProvider";
import * as SQLite from "expo-sqlite";

export const StatisticScreen = () => {
  const { db, names, getData, setNames } = useContext(DatabaseContext);
  const filterNamesByTag = (names, tag) => {
    return names.filter((name) => name.tagSelected === tag);
  };

  const studyFilter = filterNamesByTag(names, "Study").length;
  const workoutFilter = filterNamesByTag(names, "Workout").length;
  const restFilter = filterNamesByTag(names, "Rest").length;

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, tagSelected TEXT, timerMode TEXT)",
  //       [],
  //       () => {},
  //       (txObj, error) => console.log(error)
  //     );

  //     getData(); // Call getData to fetch the data
  //   });
  // }, [db]);
  // console.log("DANE DANE DANE");
  // console.log(names);
  useEffect(() => {
    console.log(
      `rest: ${restFilter} workout: ${workoutFilter} study: ${studyFilter}`
    );
  }, [names]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 22, textAlign: "center" }}>Twoje dane</Text>
        <LineChart
          data={{
            labels: ["Workout", "Study", "Rest"],
            datasets: [
              {
                data: [workoutFilter, studyFilter, restFilter],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#292929",
            backgroundGradientFrom: "#21388b",
            backgroundGradientTo: "#21388f",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "1",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
