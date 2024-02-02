import LoginModal from "~/modals/login";
import RegisterModal from "~/modals/register";
import AdminDeleteModal from "~/modals/admin-delete";
import AskRegisterModal from "~/modals/ask-register";

const modals = [
  {
    name: "login",
    title: "Giriş Yap",
    element: LoginModal,
    force: false,
  },
  {
    name: "register",
    title: "Kayıt Ol",
    element: RegisterModal,
    force: false,
  },
  {
    name: "admin-delete",
    title: "Silme İşlemi",
    element: AdminDeleteModal,
    force: false,
  },
  {
    name: "ask-register",
    title: "Uyarı!",
    element: AskRegisterModal,
    force: false,
  },
];

export default modals;
