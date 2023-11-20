import PropTypes from "prop-types";
import withNavbar from "../../../components/WithNavbar";
import Feedback from "../../Feedback/404";
import blogs from "../mock.data";
import { useParams } from "react-router-dom";

function DetailPage({ title, createdAt, owner, content }) {
  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <article className="bg-white p-8 rounded shadow-md w-4/5">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-2">Published on</span>
          <time
            dateTime={createdAt.toISOString()}
            className="text-gray-800 font-semibold"
          >
            {createdAt.toLocaleString()}
          </time>
          <span className="mx-2">&middot;</span>
          <span>{owner.name}</span>
        </div>

        <div className="prose max-w-full">
          <p>{content}</p>
        </div>
        <div className="mt-6">
          <span className="mr-2">Share:</span>
          <a className="text-blue-500 hover:underline">Facebook</a>
          <span className="mx-2">/</span>
          <a className="text-blue-500 hover:underline">Twitter</a>
        </div>
      </article>
    </div>
  );
}

function Wrapper() {
  const params = useParams();
  const slug = params.slug;
  let blog = blogs.filter((b) => b.slug === slug)[0];
  if (blog) {
    return <DetailPage {...blog} />;
  } else {
    return <Feedback />;
  }
}
DetailPage.propTypes = {
  title: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  createdAt: PropTypes.instanceOf(Date),
  content: PropTypes.string,
};
export default withNavbar(Wrapper);
