import { Transition } from "@headlessui/react";
import { ColorRing } from "react-loader-spinner";
import MetaData from "../utils/MetaData";

export default function LoadingDialog({ loading, className }) {
  return (
    <Transition
      show={loading}
      as={"div"}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed inset-0 ${
          className ? className : "bg-black bg-opacity-25"
        } grid place-items-center z-50`}
      >
        <MetaData title={"Loading"} />
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </Transition>
  );
}
