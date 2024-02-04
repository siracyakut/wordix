import useBreakpoint from "~/hooks/use-breakpoint";
import ThemeSwitcher from "~/layouts/main/footer/theme-switcher";

export default function Footer() {
  const breakpoint = useBreakpoint();

  return (
    <div className="grid gap-y-4 md:flex md:items-center md:justify-between w-full p-[25px] text-center border-t-[3px] border-light dark:border-zinc-500">
      <div className="hidden md:block md:w-52">
        {breakpoint === "desktop" && <ThemeSwitcher />}
      </div>
      <div className="flex flex-col">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">ByteBuilders</span>. All rights reserved.
        </p>
        <p className="text-xs">
          version {import.meta.env.VITE_GAME_VERSION} open-beta
        </p>
      </div>
      <div className="w-full grid md:w-52">
        {breakpoint === "mobile" && <ThemeSwitcher />}
      </div>
    </div>
  );
}
