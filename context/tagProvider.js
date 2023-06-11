import React, { createContext, useState } from "react";

export const TagContext = createContext();
import { useNavigation } from "@react-navigation/native";

export const TagProvider = ({ children }) => {
  const navigation = useNavigation();

  const [selectedTag, setSelectedTag] = useState("Study");

  const DATA = [
    {
      id: 1,
      title: "Workout",
    },
    {
      id: 2,
      title: "Study",
    },
    {
      id: 3,
      title: "Rest",
    },
  ];

  const handleTagPress = (tagId) => {
    const selectedTagData = DATA.find((item) => item.id === tagId);
    setSelectedTag(selectedTagData.title);
    navigation.navigate("Home");
  };

  return (
    <TagContext.Provider value={{ selectedTag, handleTagPress, DATA }}>
      {children}
    </TagContext.Provider>
  );
};
