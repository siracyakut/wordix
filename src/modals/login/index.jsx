import Button from "~/components/button";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import Or from "~/components/or";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "~/validations";
import { useMutation } from "react-query";
import { loginService } from "~/services/auth";
import { setUser } from "~/store/auth/actions";
import { closeModal, setModal } from "~/store/modal/actions";
import toast from "react-hot-toast";
import useGoogle from "~/hooks/use-google";

export default function LoginModal() {
  const loginMutation = useMutation({
    mutationFn: (data) => loginService(data),
    onSuccess: (data) => {
      setUser(data.data);
      closeModal();
      toast.success("Başarıyla giriş yaptınız.");
    },
    onError: (error) => toast.error(error.data),
  });

  const { googleLogin, googleLoginMutation } = useGoogle();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => loginMutation.mutate(values)}
    >
      <Form className="grid gap-y-4">
        <Input name="email" label="E-Posta:" type="email" />
        <Input name="password" label="Şifre:" type="password" />
        <Button
          disabled={loginMutation.isLoading || googleLoginMutation.isLoading}
          type="submit"
          component="button"
        >
          Giriş Yap
        </Button>
        <Or label="veya" />
        <Button
          onClick={googleLogin}
          disabled={loginMutation.isLoading || googleLoginMutation.isLoading}
          type="button"
          component="button"
        >
          <FcGoogle size={20} />
          Google ile Giriş Yap
        </Button>
        <div className="text-center text-sm mt-4">
          <p>Bir hesabınız yok mu?</p>
          <p>
            <span
              onClick={() => setModal("register")}
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:underline cursor-pointer transition-all"
            >
              Buraya tıklayarak
            </span>{" "}
            ücretsiz hesabınızı oluşturun!
          </p>
        </div>
      </Form>
    </Formik>
  );
}
