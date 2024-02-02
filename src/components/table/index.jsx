import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaSort } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setModal } from "~/store/modal/actions";

export default function Table({ data, columns, path, filterId, edit, remove }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([
    {
      id: filterId,
      value: "",
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <input
        type="text"
        autoComplete="off"
        className="mb-4 bg-white/30 border border-white/50 p-2 outline-none rounded-md focus:border-white"
        placeholder="Arama yapın..."
        onChange={(e) =>
          setColumnFilters([
            {
              ...columnFilters[0],
              value: e.target.value,
            },
          ])
        }
        value={columnFilters[0].value}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="px-6 py-3">
                    <p className="flex items-center gap-x-2">
                      {header.column.columnDef.header}
                      {header.column.getCanSort() &&
                        {
                          asc: (
                            <FaSortAlphaDownAlt
                              className="cursor-pointer hover:!text-gray-100 transition-all"
                              onClick={header.column.getToggleSortingHandler()}
                              size={15}
                            />
                          ),
                          desc: (
                            <FaSortAlphaDown
                              className="cursor-pointer hover:!text-gray-100 transition-all"
                              onClick={header.column.getToggleSortingHandler()}
                              size={15}
                            />
                          ),
                          false: (
                            <FaSort
                              className="cursor-pointer hover:!text-gray-100 transition-all"
                              onClick={header.column.getToggleSortingHandler()}
                              size={15}
                            />
                          ),
                        }[header.column.getIsSorted()]}
                    </p>
                  </th>
                ))}
                {edit && (
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Düzenle</span>
                  </th>
                )}
                {remove && (
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Sil</span>
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell, index) =>
                  index === 0 ? (
                    <th
                      key={cell.id}
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </th>
                  ) : (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ),
                )}
                {edit && (
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/${path}/edit/${
                        data.at(row.id.split("_")[0])._id
                      }`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Düzenle
                    </Link>
                  </td>
                )}
                {remove && (
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setModal("admin-delete", {
                          id: data.at(row.id.split("_")[0])._id,
                          action: path,
                        })
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Sil
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-auto">
        <div className="mx-auto w-max p-2.5 rounded-lg bg-white/10 my-4 flex flex-col items-center justify-center gap-2.5">
          <p>
            Sayfa {table.getState().pagination.pageIndex + 1}/
            {table.getPageCount()}
          </p>
          <div className="flex items-center gap-x-2.5">
            <button
              className="w-8 h-8 bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-full flex items-center justify-center"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <FaChevronLeft size={18} />
            </button>
            <button
              className="w-8 h-8 bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-full flex items-center justify-center"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  filterId: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  remove: PropTypes.bool,
};

Table.defaultProps = {
  edit: true,
  remove: true,
};
