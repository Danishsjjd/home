import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  children,
  isOpen,
  closeModal,
  zIndex,
  maxWidth,
  notCenter,
  backDrop,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`relative ${zIndex ? zIndex : "z-30"}`}
        onClose={closeModal}
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
          <div
            className={`fixed inset-0 ${backDrop ? backDrop : "bg-black/25"}`}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full justify-center p-4 text-center ${
              notCenter ? "items-start" : "items-center"
            }`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  maxWidth ? maxWidth : "max-w-4xl"
                } transform overflow-hidden rounded-2xl p-6 text-left align-middle  transition-all ${
                  notCenter ? "" : "bg-white shadow-xl"
                }`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
