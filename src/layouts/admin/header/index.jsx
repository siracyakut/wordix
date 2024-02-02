import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";

export default function AdminHeader() {
  return (
    <div className="w-full text-center rounded-md bg-white/10 p-5 grid gap-y-4 md:flex md:items-center md:justify-between mb-4">
      <div className="grid gap-y-4 md:flex md:items-center md:gap-x-8">
        <NavLink
          to="/admin"
          end={true}
          className={({ isActive }) =>
            classNames(
              "px-4 py-2 bg-white/10 rounded hover:ring-2 hover:ring-white transition-all",
              {
                "ring-2 ring-white": isActive,
              },
            )
          }
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            classNames(
              "px-4 py-2 bg-white/10 rounded hover:ring-2 hover:ring-white transition-all",
              {
                "ring-2 ring-white": isActive,
              },
            )
          }
        >
          Kullanıcı Yönetimi
        </NavLink>
        <NavLink
          to="/admin/questions"
          className={({ isActive }) =>
            classNames(
              "px-4 py-2 bg-white/10 rounded hover:ring-2 hover:ring-white transition-all",
              {
                "ring-2 ring-white": isActive,
              },
            )
          }
        >
          Soru Yönetimi
        </NavLink>
      </div>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-all"
      >
        Siteye Dön
      </Link>
    </div>
  );
}
