import { useQuery } from "react-query";
import { useMemo } from "react";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import Table from "~/components/table";
import { allUserService } from "~/services/auth";

export default function AdminUsers() {
  const { data, error, isFetching } = useQuery(["allUsers"], () =>
    allUserService(),
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "E-Mail",
        cell: (props) => props.getValue(),
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "solvedCount",
        header: "Çözülen Test",
        cell: (props) => props.getValue(),
      },
      {
        accessorKey: "trueCount",
        header: "Doğru sayısı",
        cell: (props) => props.getValue(),
      },
      {
        accessorKey: "falseCount",
        header: "Yanlış sayısı",
        cell: (props) => props.getValue(),
      },
      {
        accessorKey: "admin",
        header: "Admin?",
        cell: (props) => (props.getValue() === 1 ? "Evet" : "Hayır"),
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
      <Table data={data.data} columns={columns} path="users" filterId="email" />
    </div>
  );
}
