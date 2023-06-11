import React, { useContext, useState } from "react";
import { TagContext } from "../../context/tagProvider";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";

export const TagScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const { handleTagPress, DATA } = useContext(TagContext);

  const Item = ({ id, title }) => {
    let circleBackgroundColor = "";
    switch (title) {
      case "Workout":
        circleBackgroundColor = "red";
        break;
      case "Study":
        circleBackgroundColor = "cyan";
        break;
      case "Rest":
        circleBackgroundColor = "green";
        break;
    }
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleTagPress(id, title)}
        >
          <View
            style={[styles.circle, { backgroundColor: circleBackgroundColor }]}
          />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        style={{ paddingTop: 15 }}
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            backgroundColor={item.id ? "#ffcc00" : "#ccc"}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "red",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: "cyan",
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
