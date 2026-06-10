// Theme day and dark toggle helper
export function useTheme() {
  const DEFAULT_THEME = "light"
  const theme = useState("theme", () => DEFAULT_THEME);

  function setTheme(value) {
    theme.value = value;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(value);
    localStorage.setItem("theme", value);
  }

  function toggleTheme() {
    setTheme(theme.value === "dark" ? "light" : "dark");
  }

  onMounted(() => {
    const saved = localStorage.getItem("theme");
    setTheme(saved || DEFAULT_THEME);
  });

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
