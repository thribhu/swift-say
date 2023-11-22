/**
 * @fileoverview Custom `a` tag with tailwind css
 */
import PropTypes from "prop-types";

const Tag = ({ text, href }) => {
  const tagClasses = `inline-block px-2 py-1 rounded-full text-slate-950 italic underline`;
  return (
    <a href={href} className={tagClasses}>
      {text}
    </a>
  );
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default Tag;
