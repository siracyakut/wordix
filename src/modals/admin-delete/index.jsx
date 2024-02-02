import Button from "~/components/button";
import { closeModal } from "~/store/modal/actions";
import { useMutation, useQueryClient } from "react-query";
import { deleteQuestionService } from "~/services/questions";
import { deleteUserService } from "~/services/auth";
import toast from "react-hot-toast";

export default function AdminDeleteModal({ data }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (d) =>
      data.action === "questions"
        ? deleteQuestionService(d)
        : deleteUserService(d),
    onSuccess: async () => {
      await queryClient.refetchQueries(
        data.action === "questions" ? ["allQuestions"] : ["allUsers"],
      );
      toast.success("Silme işlemi başarılı!");
      closeModal();
    },
    onError: (error) => toast.error(error.data),
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 text-center">
      <p>Silme işlemini gerçekleştirmek istiyor musunuz?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          disabled={mutation.isLoading}
          onClick={() => mutation.mutate({ id: data.id })}
          component="button"
          type="button"
        >
          Evet
        </Button>
        <Button onClick={closeModal} component="button" type="button">
          Hayır
        </Button>
      </div>
    </div>
  );
}
