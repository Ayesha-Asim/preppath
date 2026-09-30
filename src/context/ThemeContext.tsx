import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = localStorage.getItem("theme");

  return savedTheme === "dark" ? "dark" : "light";
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const root = document.documentElement;
    const body = document.body;

    // Keep data-theme support for existing CSS variables/styles.
    root.setAttribute("data-theme", theme);
    body.setAttribute("data-theme", theme);

    // Required for Tailwind dark: classes.
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}