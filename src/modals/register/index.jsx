import { useMutation } from "react-query";
import { registerService } from "~/services/auth";
import { setUser } from "~/store/auth/actions";
import { closeModal, setModal } from "~/store/modal/actions";
import toast from "react-hot-toast";
import useGoogle from "~/hooks/use-google";
import { Form, Formik } from "formik";
import { registerSchema } from "~/validations";
import Input from "~/components/input";
import Button from "~/components/button";
import Or from "~/components/or";
import { FcGoogle } from "react-icons/fc";

export default function RegisterModal() {
  const registerMutation = useMutation({
    mutationFn: (data) => registerService(data),
    onSuccess: (data) => {
      setUser(data.data);
      closeModal();
      toast.success("Başarıyla kayıt oldunuz.");
    },
    onError: (error) => toast.error(error.data),
  });

  const { googleLogin, googleLoginMutation } = useGoogle();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => registerMutation.mutate(values)}
    >
      <Form className="grid gap-y-4">
        <Input name="email" label="E-Posta:" type="email" />
        <Input name="password" label="Şifre:" type="password" />
        <Input name="passwordConfirm" label="Tekrar Şifre:" type="password" />
        <Button
          disabled={registerMutation.isLoading || googleLoginMutation.isLoading}
          type="submit"
          component="button"
        >
          Kayıt Ol
        </Button>
        <Or label="veya" />
        <Button
          onClick={googleLogin}
          disabled={registerMutation.isLoading || googleLoginMutation.isLoading}
          type="button"
          component="button"
        >
          <FcGoogle size={20} />
          Google ile Giriş Yap
        </Button>
        <div className="text-center text-sm mt-4">
          <p>Zaten bir hesabınız var mı?</p>
          <p>
            <span
              onClick={() => setModal("login")}
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline cursor-pointer transition-all"
            >
              Buraya tıklayarak
            </span>{" "}
            giriş yapın.
          </p>
        </div>
      </Form>
    </Formik>
  );
}
