import { HiChevronUpDown } from "react-icons/hi2";
import { Listbox as HListBox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function Listbox({ label, options, selected, setSelected }) {
  return (
    <div>
      <div className="mb-2.5 text-black dark:text-zinc-200">{label}</div>
      <HListBox name="test" value={selected} onChange={setSelected}>
        <div className="relative">
          <HListBox.Button className="relative w-full cursor-pointer rounded-lg bg-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </HListBox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HListBox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <HListBox.Option
                  key={index}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      {
                        "bg-amber-100 text-amber-900": active,
                        "text-gray-900": !active,
                      },
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames("block truncate", {
                          "font-medium": selected,
                          "font-normal": !selected,
                        })}
                      >
                        {option.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </HListBox.Option>
              ))}
            </HListBox.Options>
          </Transition>
        </div>
      </HListBox>
    </div>
  );
}

Listbox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
};
