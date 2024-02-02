import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import {
  MdArrowForwardIos,
  MdOutlineClear,
  MdOutlineDone,
} from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function ResultItem({ item, userAnswers, answers, index }) {
  console.log(userAnswers);

  return (
    <Disclosure as="div" className="w-full">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              "w-full flex items-center justify-between p-2.5 border-2 border-light dark:border-zinc-500 outline-none",
              {
                rounded: !open,
                "rounded-t": open,
              },
            )}
          >
            <div className="flex-shrink-0">
              {userAnswers.at(index) === -1 ? (
                <MdArrowForwardIos className="text-yellow-600" size={20} />
              ) : userAnswers.at(index) === 1 ? (
                <MdOutlineDone className="text-green-500" size={25} />
              ) : (
                <MdOutlineClear className="text-red-600" size={25} />
              )}
            </div>
            {item.answer.includes(",") ? (
              <p>{item.answer.split(",").at(0).toLocaleUpperCase("tr-TR")}</p>
            ) : (
              <p>{item.answer.toLocaleUpperCase("tr-TR")}</p>
            )}
            <div className="flex-shrink-0">
              <FaAngleDown
                className={classNames({ "rotate-180": open })}
                size={20}
              />
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition duration-250 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-225 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="flex flex-col gap-2 text-sm text-center border-2 border-t-0 border-light dark:border-zinc-500 rounded-b p-2.5">
              <p>
                <b>Doğru cevap:</b> {item.answer}
              </p>
              {answers.at(index) && (
                <p>
                  <b>Sizin cevabınız:</b> {answers.at(index)}
                </p>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

ResultItem.propTypes = {
  item: PropTypes.object.isRequired,
  userAnswers: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};
