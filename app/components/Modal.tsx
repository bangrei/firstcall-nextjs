"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import { createNewUser, updateUserById } from "@/lib/services";
import { useAlertStore } from "@/store/AlertStore";

function Modal() {
  const [
    title,
    id,
    username,
    firstname,
    lastname,
    isOpen,
    closeModal,
    setId,
    setUsername,
    setFirstname,
    setLastname,
  ] = useModalStore((state) => [
    state.title,
    state.id,
    state.username,
    state.firstname,
    state.lastname,
    state.isOpen,
    state.closeModal,
    state.setId,
    state.setUsername,
    state.setFirstname,
    state.setLastname,
  ]);

  const [showAlert, setAlertTitle, setAlertMessage, openAlert] = useAlertStore(
    (state) => [
      state.showAlert,
      state.setAlertTitle,
      state.setAlertMessage,
      state.openAlert,
    ]
  );

  const [createUser, updateUser] = useBoardStore((state) => [
    state.createUser,
    state.updateUser,
  ]);

  const _submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let messages = [];
    if (username.length < 4)
      messages.push("Min. 4 characters of username is required!");
    if (username.length > 44)
      messages.push("Max. 4 characters of username is required!");
    if (firstname.length < 4)
      messages.push("Min. 4 characters of first name is required!");
    if (firstname.length > 48)
      messages.push("Max. 4 characters of first name is required!");
    if (lastname.length > 55)
      messages.push("Max. 55 characters of last name is required!");
    if (messages.length > 0) return _setAlert("Alert", messages[0]);

    const params = {
      username: username,
      firstname: firstname,
      lastname: lastname,
    };

    if (!id) {
      const res = await createNewUser(params);
      if (res.error) {
        return _setAlert("Alert", res.message.toString());
      }
      const user: User = {
        ...params,
        id: res.$id,
      };
      closeModal();
      createUser(user);
    } else {
      const user: User = { ...params, id: id };
      const res = await updateUserById(user);
      closeModal();
      updateUser(user);
    }
  };

  const _setAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    openAlert();
  };

  const _closeModal = () => {
    if (showAlert) return;
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10 w-full"
        onClose={() => _closeModal()}
        onSubmit={(e) => _submit(e)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-slate-200">
                  {title}
                </Dialog.Title>
                <div className="pt-8 font-light w-full flex flex-col gap-4">
                  <input
                    className="flex items-center px-4 py-2 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={id ? true : false}
                    placeholder="Username"
                  />
                  <input
                    className="flex items-center px-4 py-2 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="First Name"
                  />
                  <input
                    className="flex items-center px-4 py-2 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name"
                  />
                  <button
                    className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-tr from-teal-400 to-blue-500 text-white font-bold hover:from-blue-500 hover:to-teal-400"
                    type="submit"
                  >
                    {id !== "" ? "Update" : "Create"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
