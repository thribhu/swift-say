/**
 * @fileoverview user dashboard valid routes
 */
import Feedback from "../../pages/Feedback/404";
import Home from "../../pages/Home";
import navlinks from "../links";
const User = {
  path: "/",
  element: <Home links={navlinks} />,
  errorElement: <Feedback title={"Invalid entry"} />,
};
export default User;
