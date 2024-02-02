import Button from "~/components/button";
import { useTheme } from "~/store/app/hooks";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { setTheme } from "~/store/app/actions";

export default function Footer() {
  const theme = useTheme();

  return (
    <div className="grid gap-y-4 md:flex md:items-center md:justify-between w-full p-[25px] text-center border-t-[3px] border-light dark:border-zinc-500">
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
      <div className="flex flex-col">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">ByteBuilders</span>. All rights reserved.
        </p>
        <p className="text-xs">
          version {import.meta.env.VITE_GAME_VERSION} open-beta
        </p>
      </div>
      <div className="md:w-52" />
    </div>
  );
}
