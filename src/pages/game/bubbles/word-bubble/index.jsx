import classNames from "classnames";
import PropTypes from "prop-types";

export default function WordBubble({ variant, trulyState, children }) {
  return (
    <div
      className={classNames(
        "font-bold text-[15px] bg-light dark:bg-dark w-[60px] h-[60px] rounded-[30px] flex items-center justify-center text-center",
        {
          "!text-[25px] !w-auto !min-w-[100px] !h-[100px] !rounded-[50px] p-[20px] drop-shadow-[0_0_20px_rgba(255,255,0,0.5)]":
            variant === "now",
          "drop-shadow-[0_0_20px_rgba(0,128,0,0.5)]":
            variant !== "hold" && trulyState === false,
          "drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]":
            (variant === "hold" || variant === "prev") && trulyState === true,
          "drop-shadow-[0_0_20px_gray]": variant === "hold",
        },
      )}
    >
      {children}
    </div>
  );
}

WordBubble.propTypes = {
  variant: PropTypes.string.isRequired,
  trulyState: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
