import { Outlet } from "react-router-dom";
import Header from "~/layouts/main/header";
import Footer from "~/layouts/main/footer";
import { Toaster } from "react-hot-toast";
import { useModal } from "~/store/modal/hooks";
import Modal from "~/modals";
import { useQuery } from "react-query";
import { authService } from "~/services/auth";
import { destroyUser, setUser } from "~/store/auth/actions";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import { useTheme } from "~/store/app/hooks";

export default function MainLayout() {
  const [isOk, setIsOk] = useState(false);
  const { modal } = useModal();
  const theme = useTheme();

  useQuery(["userAuth"], () => authService(), {
    onSuccess: (data) => {
      setUser(data.data);
      setIsOk(true);
    },
    onError: () => {
      destroyUser();
      setIsOk(true);
    },
  });

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return isOk ? (
    <div className="w-full h-full flex flex-col">
      <Toaster position="top-right" />
      {modal && <Modal />}
      <Header />
      <div className="my-10 px-4 flex-1 max-w-[1200px] mx-auto w-full flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}
