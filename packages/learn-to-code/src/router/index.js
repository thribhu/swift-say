/**
 * @fileoverview exports the individual dashboard route
 */
import { createBrowserRouter } from "react-router-dom";
import UserRoutes from "./home";
import { blogDetail, blogs } from "./blogs";
const root = createBrowserRouter([UserRoutes, blogDetail, blogs]);
export default root;
