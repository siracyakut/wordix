import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Input({ label, name, ...props }) {
  const [animationParent] = useAutoAnimate();

  return (
    <div>
      {label && (
        <div className="mb-2.5 text-black dark:text-zinc-200">{label}</div>
      )}
      <Field
        autoComplete="off"
        name={name}
        className="w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black dark:text-white focus:border-zinc-300"
        {...props}
      />
      <div className="text-nowrap" ref={animationParent}>
        <ErrorMessage
          component="small"
          name={name}
          className="text-xs text-red-400 mt-1 block"
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  props: PropTypes.object,
};
