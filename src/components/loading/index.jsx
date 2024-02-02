import PropTypes from "prop-types";
import classNames from "classnames";

export default function Loading({ inline }) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center flex-col h-full gap-8",
        {
          "h-full fixed inset-0 bg-light dark:bg-dark z-[50]": !inline,
          "py-5": inline,
        },
      )}
    >
      <span className="inline-block w-[68px] h-[68px] border-[5px] border-white border-b-black rounded-[50%] animate-spin"></span>
      <span className="font-bold text-black dark:text-white tracking-[2px] uppercase">
        Yükleniyor...
      </span>
    </div>
  );
}

Loading.propTypes = {
  inline: PropTypes.bool,
};

Loading.defaultProps = {
  inline: false,
};
