import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import "./index.css";

const ThemeContext = React.createContext({ theme: 'light', toggleTheme: () => {} });


const MainApp = () => {
  const [theme, setTheme] = React.useState('light');
  const customTheme = { theme };
  // Загрузка темы из localStorage при первом рендере
  React.useEffect(() => {
    const storedTheme = localStorage.getItem('NetBitProgramm_605238_Theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('NetBitProgramm_605238_Theme', newTheme); // Сохраняем выбранную тему в localStorage
  };
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  React.useEffect(() => {
    if (theme === 'dark') {
       document.body.classList.add('dark');
    } else {
       document.body.classList.remove('dark');
    }
 }, [theme === 'dark']);

  // Обновление корневого размера шрифта при первом рендере
  React.useEffect(() => {
    const storedSize = localStorage.getItem('NetBitProgramm_448673_Size');
    if (storedSize) {
      const newSize = (16 * Number(storedSize)) / 100;
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  }, []);
  
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider value={customTheme}>
          <div className={`max-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <App />
          </div>
        </ThemeProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainApp />);

export { ThemeContext };
