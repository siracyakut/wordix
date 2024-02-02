import { createElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Button({ component, children, className, ...props }) {
  return createElement(
    component,
    {
      className: classNames(
        "flex items-center justify-center gap-x-2.5 text-sm px-4 py-2 bg-zinc-500 text-white border-black dark:bg-white/20 border dark:border-white/50 rounded cursor-pointer hover:bg-zinc-400 dark:hover:bg-white/30 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        {
          [className]: !!className,
        },
      ),
      ...props,
    },
    children,
  );
}

Button.propTypes = {
  component: PropTypes.oneOf([Link, "button", "a", "div"]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  props: PropTypes.object,
};
