import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useModal } from "~/store/modal/hooks";
import { useQuery } from "react-query";
import { authService } from "~/services/auth";
import { destroyUser, setUser } from "~/store/auth/actions";
import { Toaster } from "react-hot-toast";
import Modal from "~/modals";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import AdminHeader from "~/layouts/admin/header";

export default function AdminLayout() {
  const [isOk, setIsOk] = useState(false);
  const { modal } = useModal();

  const { data, error } = useQuery(["userAuth"], () => authService(), {
    onSuccess: (data) => {
      setUser(data.data);
      setIsOk(true);
    },
    onError: () => {
      destroyUser();
      setIsOk(true);
    },
  });

  return !isOk ? (
    <Loading />
  ) : error ? (
    <ErrorBox>{error.data}</ErrorBox>
  ) : data.data.admin === 1 ? (
    <div className="max-w-[1030px] mx-auto p-4 w-full h-full flex flex-col">
      {modal && <Modal />}
      <Toaster position="top-right" />
      <AdminHeader />
      <Outlet />
    </div>
  ) : (
    <ErrorBox>Bu sayfaya erişim yetkiniz yok!</ErrorBox>
  );
}
