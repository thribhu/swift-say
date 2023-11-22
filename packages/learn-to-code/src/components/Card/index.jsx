/**
 * @fileoverview Card component with header, body, footer
 */

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../Avatar/avatar";

function BlogCard({ title, titleHelp, content, owner, hero, slug }) {
  const navigate = useNavigate();
  const truncatedContent = content ? content.slice(0, 250) : "";

  const generateMedia = (hero) => {
    return (
      <div className="bg-gray-300 h-56 w-full rounded-md m-1 flex items-center justify-center">
        <img
          src={hero}
          className="h-56 w-full rounded-md"
          alt="blog item hero"
        />
      </div>
    );
  };

  const Header = ({ title, statsTitle, owner }) => {
    return (
      <div className="bg-slate-200 text-slate-900 flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold overflow-hidden overflow-ellipsis h-8">
            {title}
          </h1>
          <h4 className="text-sm font-thin">{statsTitle}</h4>
        </div>
        <Avatar uri={owner.avatar} alt={owner.name} />
      </div>
    );
  };

  const Content = (props) => {
    return <div className="p-4">{props.children}</div>;
  };
  const Footer = (props) => {
    return (
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <div className="flex items-center space-x-4">
          <button
            aria-label="comment"
            className="text-gray-500 hover:text-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </button>
          <button
            aria-label="view detail"
            className="text-gray-500 hover:text-indigo-500"
            onClick={() => {
              navigate(`/blogs/${slug}`);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
        {/* <div className="text-gray-500">
          {interactionCount} Likes
        </div> */}
      </div>
    );
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg">
      <Header title={title} titleHelp={titleHelp} owner={owner} />
      <Content>
        <p className="text-gray-700">{truncatedContent}...</p>
      </Content>
      <div className="flex px-4">{generateMedia(hero)}</div>
      <Footer />
    </div>
  );
}
// footer

BlogCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  statsTitle: PropTypes.string,
  content: PropTypes.string.isRequired,
  hero: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default BlogCard;
