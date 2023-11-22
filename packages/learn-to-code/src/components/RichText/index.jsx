import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import toc from "remark-toc";
import prism from "@mapbox/rehype-prism";
import Tag from "../TagLink";

function RichText({ content }) {
  const CustomLink = ({ href, children }) => {
    return <Tag text={children} color="text-slate-950" href={href} />;
  };
  return (
    <ReactMarkdown
      components={{
        a: CustomLink,
      }}
      rehypePlugins={[prism]}
      remarkPlugins={[toc, gfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
RichText.propTypes = {
  content: PropTypes.string.isRequired,
};
export default RichText;
