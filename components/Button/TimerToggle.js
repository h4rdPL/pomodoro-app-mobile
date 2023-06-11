import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
export const TimerToggle = ({
  startCountDownHandler,
  stopCountDownHandler,
  isTimerRunning,
}) => {
  const toggleTimer = () => {
    isTimerRunning ? stopCountDownHandler() : startCountDownHandler();
  };

  return (
    <View>
      <Pressable
        onPress={toggleTimer}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <View>
          <Text style={styles.TimerToggle}>
            {isTimerRunning ? " STOP🔴" : " START 🟢"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  TimerToggle: {
    fontSize: 35,
    fontWeight: "300",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
