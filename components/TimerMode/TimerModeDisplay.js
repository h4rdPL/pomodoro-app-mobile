import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const TimerModeDisplay = ({ timerMode }) => {
  return (
    <View style={styles.timerCountDownContainer}>
      <Text style={styles.timerCountDownText}>
        {timerMode} Time {timerMode === "Break" ? " 🥦" : "🍅"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCountDownText: {
    fontWeight: "300",
    fontSize: 40,
  },
});
