import PropTypes from "prop-types";

export default function ErrorBox({ children }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-0">
      <div className="text-center p-4 bg-red-200 text-red-700 border border-red-400 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}

ErrorBox.propTypes = {
  children: PropTypes.node.isRequired,
};
