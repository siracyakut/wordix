import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import Button from "~/components/button";
import toast from "react-hot-toast";
import { getUserByIdService, updateUserAdminService } from "~/services/auth";
import { editUserSchema } from "~/validations";
import { useMemo, useState } from "react";
import Listbox from "~/components/listbox";

export default function AdminUsersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const options = useMemo(
    () => [
      { name: "Evet", value: 1 },
      { name: "Hayır", value: 0 },
    ],
    [],
  );
  const [selected, setSelected] = useState(options[0]);

  const { data, error, isFetching } = useQuery(
    ["userEdit", id],
    () => getUserByIdService({ id }),
    {
      onSuccess: (d) =>
        setSelected(options.find((o) => o.value === d.data.admin)),
    },
  );

  const mutation = useMutation({
    mutationFn: (data) => updateUserAdminService(data),
    onSuccess: () => {
      queryClient.removeQueries(["allUsers"]);
      toast.success("Kullanıcı başarıyla güncellendi!");
      navigate("/admin/users");
    },
    onError: (error) => toast.error(error.data),
  });

  return isFetching ? (
    <Loading inline={true} />
  ) : error ? (
    <ErrorBox>{error.data}</ErrorBox>
  ) : (
    <Formik
      initialValues={{
        email: data.data.email,
        solvedCount: data.data.solvedCount,
        trueCount: data.data.trueCount,
        falseCount: data.data.falseCount,
      }}
      validationSchema={editUserSchema}
      onSubmit={(values) =>
        mutation.mutate({ id, admin: selected.value, ...values })
      }
    >
      <Form className="bg-white/10 p-5 rounded-md grid gap-y-4">
        <Input name="email" label="E-Mail:" />
        <Input name="solvedCount" label="Çözülen test sayısı:" />
        <Input name="trueCount" label="Doğru soru sayısı:" />
        <Input name="falseCount" label="Yanlış soru sayısı:" />
        <Listbox
          label="Admin yetkisi:"
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        <Button
          disabled={mutation.isLoading}
          className="mt-2"
          type="submit"
          component="button"
        >
          Kaydet
        </Button>
      </Form>
    </Formik>
  );
}
