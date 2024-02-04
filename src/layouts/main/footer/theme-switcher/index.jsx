import { setTheme } from "~/store/app/actions";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import Button from "~/components/button";
import { useTheme } from "~/store/app/hooks";

export default function ThemeSwitcher() {
  const theme = useTheme();

  return (
    <Button
      className="md:w-52"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
      component="button"
    >
      {theme === "dark" ? (
        <>
          <IoIosSunny size={20} />
          <p>Açık Tema'ya Geç</p>
        </>
      ) : (
        <>
          <IoIosMoon size={20} />
          <p>Koyu Tema'ya Geç</p>
        </>
      )}
    </Button>
  );
}
