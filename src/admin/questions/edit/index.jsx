import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getQuestionByIdService,
  updateQuestionService,
} from "~/services/questions";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import Button from "~/components/button";
import toast from "react-hot-toast";
import { editQuestionSchema } from "~/validations";

export default function AdminQuestionsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isFetching } = useQuery(["questionEdit", id], () =>
    getQuestionByIdService({ id }),
  );

  const mutation = useMutation({
    mutationFn: (data) => updateQuestionService(data),
    onSuccess: () => {
      queryClient.removeQueries(["allQuestions"]);
      toast.success("Soru başarıyla güncellendi!");
      navigate("/admin/questions");
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
        question: data.data.question,
        letter: data.data.letter,
        answer: data.data.answer,
      }}
      validationSchema={editQuestionSchema}
      onSubmit={(values) => mutation.mutate({ id, ...values })}
    >
      <Form className="bg-white/10 p-5 rounded-md grid gap-y-4">
        <Input name="question" label="Soru:" />
        <Input name="letter" label="Harf:" />
        <Input name="answer" label="Cevap:" />
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
