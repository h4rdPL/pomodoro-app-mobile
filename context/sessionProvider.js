import React, { createContext, useState } from "react";

export const SessionContext = createContext();

const DATA = [
  {
    id: 1,
    tagSelected: "Study",
    timerMode: "Focus",
  },
  {
    id: 2,
    tagSelected: "Study",
    timerMode: "Break",
  },
  {
    id: 3,
    tagSelected: "Workout",
    timerMode: "Focus",
  },
];

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(DATA);
  const [sessionCounter, setSessionCounter] = useState(22);

  const setData = (tag, mode) => {
    const newSession = {
      id: sessionData.length + 1, // Use sessionData length instead of DATA length
      tagSelected: tag,
      timerMode: mode,
    };
    setSessionData((prev) => [...prev, newSession]);
  };

  return (
    <SessionContext.Provider
      value={{ sessionCounter, setSessionCounter, sessionData, setData }}
    >
      {children}
    </SessionContext.Provider>
  );
};
