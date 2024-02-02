import Button from "~/components/button";
import { closeModal, setModal } from "~/store/modal/actions";
import { useNavigate } from "react-router-dom";

export default function AskRegisterModal() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2.5 text-center">
      <p>Sitemize kayıt olarak liderlik sisteminden faydalanabilirsiniz.</p>
      <p>
        Kayıt olduğunuz takdirde oyun sonunda diğer kişiler içerisinde kaçıncı
        sıraya yerleştiğinizi görebileceksiniz ve liderlik tablosuna isminizi
        yazdıracaksınız.
      </p>
      <p>Yine de kayıt olmadan da oyuna başlayabilirsiniz.</p>
      <div className="mt-2 grid md:grid-cols-2 gap-2.5 whitespace-nowrap">
        <Button
          onClick={() => setModal("register")}
          component="button"
          type="button"
        >
          Kayıt Ol
        </Button>
        <Button
          onClick={() => {
            closeModal();
            navigate("/game");
          }}
          component="button"
          type="button"
        >
          Kayıt Olmadan Devam Et
        </Button>
      </div>
    </div>
  );
}
