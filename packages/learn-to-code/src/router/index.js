/**
 * @fileoverview exports the individual dashboard route
 */
import {
    createBrowserRouter,
  } from "react-router-dom";
import UserRoutes from './home'
import BlogRoutes from './blogs'
const root = createBrowserRouter([UserRoutes, BlogRoutes])
export default root
