import { useColorScheme } from "nativewind"
import { Switch } from "react-native"



export const ThemeSwitcher = () => {
  const { toggleColorScheme, colorScheme
  } = useColorScheme()

  return (
    <Switch
      onChange={() => {
        toggleColorScheme()
      }}
      trackColor={{ false: "#1f1f1f", true: "#f97316" }}
      value={colorScheme === "dark"}
      collapsable
      thumbColor={"#ffffff"}
    />

  )

}
