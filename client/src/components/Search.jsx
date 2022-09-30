import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SearchIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { API } from "../libs/axios";
import Modal from "./Modal";

const Search = ({ setOpen, open }) => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  useDebounce(
    async () => {
      try {
        const response = await API.searchProduct({
          data: { word: value ? value : "" },
        });
        setProducts(response.data.products);
      } catch (e) {
        toast.error(e?.response?.data?.message || e?.message);
      }
    },
    1000,
    [value]
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await API.searchProduct({
          data: { word: "" },
        });
        setProducts(response.data.products);
      } catch (e) {
        toast.error(e?.response?.data?.message || e?.message);
      }
    };
    getProducts();
    return setProducts([]);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  return (
    <Modal
      closeModal={setOpen}
      isOpen={open}
      notCenter
      maxWidth={"max-w-xl pt-[5%]"}
      backDrop="bg-secondary-lighter/80"
    >
      <div className="bg-white rounded-xl ring-1 ring-black/5">
        <Combobox
          onChange={(product) => {
            navigate(`product/${product._id}`);
            setOpen(false);
          }}
        >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
              <Combobox.Input
                className="w-full border-none py-2 pl-10 text-sm leading-5 text-gray-900 focus:ring-0 h-12"
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search..."
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {products.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  products.map((product) => (
                    <Combobox.Option
                      key={product._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-secondary-darker text-white"
                            : "text-gray-900"
                        }`
                      }
                      value={product}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {product.title}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-red-400" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </Modal>
  );
};

export default Search;
