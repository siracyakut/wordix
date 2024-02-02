import { useQuery } from "react-query";
import { getAllQuestionsService } from "~/services/questions";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import { useMemo } from "react";
import Table from "~/components/table";

export default function AdminQuestions() {
  const { data, error, isFetching } = useQuery(["allQuestions"], () =>
    getAllQuestionsService(),
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "question",
        header: "Soru",
        cell: (props) => props.getValue(),
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "letter",
        header: "Harf",
        cell: (props) => props.getValue(),
      },
      {
        accessorKey: "answer",
        header: "Cevap",
        cell: (props) => props.getValue(),
      },
    ],
    [],
  );

  return isFetching ? (
    <Loading inline={true} />
  ) : error ? (
    <ErrorBox>{error.data}</ErrorBox>
  ) : (
    <div className="w-full h-full flex flex-col">
      <Table
        data={data.data}
        columns={columns}
        path="questions"
        filterId="question"
      />
    </div>
  );
}
