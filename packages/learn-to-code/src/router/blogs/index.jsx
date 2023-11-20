/**
 * @fileoverview blog dashboard valid routes
 */
import Feedback from "../../pages/Feedback/404";
import Blogs from "../../pages/Blogs";
import navLinks from "../links";
import DetailPage from "../../pages/Blogs/detail";
const blogs = {
  path: "/blogs",
  element: <Blogs links={navLinks} />,
  errorElement: <Feedback title={"Not a valid blog"} />,
};
const blogDetail = {
  path: "/blogs/:slug",
  element: <DetailPage links={navLinks} />,
  errorElement: <Feedback title={"Not a valid blog"} />,
};
export { blogs, blogDetail };
