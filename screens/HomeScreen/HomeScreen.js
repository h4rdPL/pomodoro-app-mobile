import React, { useContext } from "react";
import { TimerCountDownDisplay } from "../../components/CountDisplay/TimerCountDownDisplay";
import { TimerToggle } from "../../components/Button/TimerToggle";
import { TimerModeDisplay } from "../../components/TimerMode/TimerModeDisplay";
import { TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { TagContext } from "../../context/tagProvider";
import { SessionContext } from "../../context/sessionProvider";
import { Accelerometer } from "expo-sensors";
import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { DatabaseContext } from "../../context/databaseProvider";

// const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const FOCUS_TIME_MINUTES = 10000;
const BREAK_TIME_MINUTES = 5000;

export const HomeScreen = () => {
  // sensor
  const [{ x, y, z }, setSensor] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINUTES);
  const [intervalId, setIntervalId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("Focus");
  const [isMove, setIsMove] = useState(false);

  const [currentName, setCurrentName] = useState(undefined);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setSensor));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // context
  const { selectedTag } = useContext(TagContext);
  const { setSessionCounter, setData } = useContext(SessionContext);
  const { addName, names } = useContext(DatabaseContext);
  // app
  useEffect(() => {
    if (isTimerRunning) {
      _subscribe();
    }
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerMode("Break");
        setTimerCount(BREAK_TIME_MINUTES);
        setSessionCounter((prev) => prev + 1);
        setData(selectedTag, timerMode);

        // Wait for the database insertion to complete before logging names
        addName(selectedTag, timerMode);
      } else {
        setTimerMode("Focus");
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      stopCountDown();
    }
    return () => _unsubscribe();
  }, [timerCount, timerMode]);

  useEffect(() => {
    if (timerMode == "Focus") {
      if (x > 0.07) {
        console.log(x);
        setIsMove(true);
      } else {
        setIsMove(false);
      }
    } else {
      setIsMove(false);
    }
  }, [x]);
  const startCountDown = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setIntervalId(id);
  };

  const stopCountDown = () => {
    setIsTimerRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  };
  return (
    <View style={styles.container}>
      <TimerModeDisplay timerMode={timerMode} />
      <View style={styles.innerContainer}>
        <Text style={{ textAlign: "center" }}>
          {selectedTag ? selectedTag.toUpperCase() : "No tag selected"}
        </Text>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          {isMove ? `WRACAJ DO ${selectedTag}` : ""}
        </Text>
        <AnimatedCircularProgress
          rotation={0}
          size={200}
          width={3}
          dashedBackground={{ width: 2, gap: 4 }}
          fill={
            (timerCount /
              (timerMode === "Focus"
                ? FOCUS_TIME_MINUTES
                : BREAK_TIME_MINUTES)) *
            100
          } // Adjust the fill value based on the timer progress
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {() => (
            <Text>
              <TimerCountDownDisplay timerDate={new Date(timerCount)} />
            </Text>
          )}
        </AnimatedCircularProgress>
        <TimerToggle
          startCountDownHandler={startCountDown}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          stopCountDownHandler={stopCountDown}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: "cyan",
    marginRight: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
});
