"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { removeUserById } from "@/lib/services";
import { useAlertStore } from "@/store/AlertStore";

function Home() {
  const [
    loading,
    perPage,
    pageNums,
    totalRows,
    searchString,
    board,
    getBoard,
    removeUser,
  ] = useBoardStore((state) => [
    state.loading,
    state.perPage,
    state.pageNums,
    state.totalRows,
    state.searchString,
    state.board,
    state.getBoard,
    state.setBoardState,
    state.removeUser,
  ]);

  const [openModal, setTitle, setId, setUsername, setFirstname, setLastname] =
    useModalStore((state) => [
      state.openModal,
      state.setTitle,
      state.setId,
      state.setUsername,
      state.setFirstname,
      state.setLastname,
    ]);

  const [setAlertTitle, setAlertMessage, openAlert] = useAlertStore((state) => [
    state.setAlertTitle,
    state.setAlertMessage,
    state.openAlert,
  ]);

  const [processing, setProcessing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const changePage = (index: any) => {
    setPageIndex(index);
  };

  const deleteUser = async (user: any) => {
    setProcessing(true);
    await removeUserById(user.id);
    removeUser(user.id);
    setProcessing(false);

    setAlertTitle("Deleted");
    setAlertMessage("User has been deleted successfully!");
    openAlert();
  };

  const _openModal = (title: string) => {
    setTitle(title);
    openModal();
  };

  const _setParams = (user: any) => {
    setId(user.id);
    setUsername(user.username);
    setFirstname(user.firstname);
    setLastname(user.lastname);
  };

  const _clickNewUser = () => {
    _setParams({
      id: "",
      username: "",
      firstname: "",
      lastname: "",
    });
    _openModal("New User");
  };

  const _clickEditUser = (user: any) => {
    _setParams(user);
    _openModal("Edit User");
  };

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <div className="w-full h-full flex flex-col gap-4 text-slate-600">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold py-4">Users</h1>
        <div
          onClick={() => _clickNewUser()}
          className="cursor-pointer flex space-x-1 items-center hover:opacity-70"
        >
          <UserPlusIcon className="w-4 h-4 text-black" />
          <span className="text-xs font-light text-black">Add New User</span>
        </div>
      </div>
      {processing && (
        <div className="flex flex-col items-center justify-center absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.1)]">
          <span>Please wait...</span>
        </div>
      )}
      <table className="w-full border border-slate-200 bg-white font-light">
        <thead className="border border-b-4 text-left text-xs md:text-md">
          <tr>
            <th className="font-semibold p-2 border w-3">No.</th>
            <th className="font-semibold p-2 border">Username</th>
            <th className="font-semibold p-2 border">First Name</th>
            <th className="font-semibold p-2 border">Last Name</th>
            <th className="font-semibold p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td
                colSpan={4}
                className="flex w-full items-center justify-spacebetween text-center p-4 text-sky-600"
              >
                Loading...
              </td>
            </tr>
          )}
          {!loading &&
            board.users
              .slice(pageIndex * perPage, (pageIndex + 1) * perPage)
              .map((user: any, i) => {
                if (
                  searchString &&
                  !user.username
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) &&
                  !user.firstname
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) &&
                  !user.lastname
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                )
                  return null;

                return (
                  <tr
                    key={user.id}
                    className="group hover:bg-slate-100 text-xs md:text-md"
                  >
                    <td className="text-sm p-2 border w-3 group-hover:text-slate-400">
                      {(searchString ? 0 : pageIndex * perPage) + i + 1}.
                    </td>
                    <td className="text-sm p-2 border group-hover:text-slate-900">
                      {user.username}
                    </td>
                    <td className="text-sm p-2 border group-hover:text-slate-900">
                      {user.firstname}
                    </td>
                    <td className="text-sm p-2 border group-hover:text-slate-900">
                      {user.lastname}
                    </td>
                    <td className="text-sm p-2 border group-hover:text-slate-900 w-20">
                      <div className="flex items-center w-full gap-2">
                        <div
                          onClick={() => _clickEditUser(user)}
                          className="flex items-center gap-1 text-emerald-600 md:bg-gradient-to-tr md:from-emerald-600 md:to-blue-300 md:text-white rounded-sm py-0.5 px-1 cursor-pointer hover:opacity-50"
                        >
                          <PencilSquareIcon className="w-4 h-4 md:w-3 md:h-3" />
                          <span className="text-xs hidden md:inline-block">
                            Edit
                          </span>
                        </div>
                        <div
                          onClick={() => deleteUser(user)}
                          className="text-red-500 flex items-center gap-1 md:bg-gradient-to-tr md:from-red-500 md:to-orange-400 md:text-white rounded-sm py-0.5 px-1 cursor-pointer hover:opacity-50"
                        >
                          <TrashIcon className="w-4 h-4 md:w-3 md:h-3" />
                          <span className="text-xs hidden md:inline-block">
                            Delete
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div className="flex flex-col gap-2 py-1 text-xs">
        {!loading && !searchString && (
          <div className="w-full flex flex-col gap-4">
            <div className="font-light flex gap-1">
              <span>Showing: rows</span>

              <span>
                {pageIndex * perPage + 1} -{" "}
                {(pageIndex + 1) * perPage > totalRows
                  ? totalRows
                  : (pageIndex + 1) * perPage}
              </span>
            </div>
            <div className="flex items-center rounded-md overflow-hidden border border-teal-400 w-fit">
              {Array(pageNums)
                .fill(0, 0, pageNums)
                .map((_, i) => {
                  return (
                    <span
                      onClick={() => changePage(i)}
                      key={i}
                      className={`py-1 px-4 cursor-pointer ${
                        pageIndex == i
                          ? "bg-gradient-to-tr from-teal-400 to-blue-500 text-white font-bold"
                          : "bg-slate-100"
                      }`}
                    >
                      {i + 1}
                    </span>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
