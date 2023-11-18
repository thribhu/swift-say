/**
 * @fileoverview Avatar component with tailwind css
 */

import PropTypes from "prop-types";

const DefaultUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 flex-none rounded-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

function Avatar({ uri, alt }) {
  return (
    <>
      {uri.length ? (
        <div className="shrink-0">
          <img
            className="h-12 w-12 flex-none rounded-full"
            src={uri.length ? uri : undefined}
            alt={alt}
          />
        </div>
      ) : (
        <DefaultUser />
      )}
    </>
  );
}

Avatar.propTypes = {
  uri: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Avatar;
