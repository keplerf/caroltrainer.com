import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

const themeContextDefault = {
  theme: "light",
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const [themeContext, setTheme] = useState(themeContextDefault);

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default useTheme;
