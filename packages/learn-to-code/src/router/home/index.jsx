/**
 * @fileoverview user dashboard valid routes
 */
import Feedback from '../../pages/Feedback/404'
import Home from '../../pages/Home'
import navlinks from '../links'
const User = {
    path: "/",
    element: <Home links={navlinks}/>,
    errorElement: <Feedback title={"Invalid entry"}/> 
}
// interface RouteObject {
//     path?: string;
//     index?: boolean;
//     children?: React.ReactNode;
//     caseSensitive?: boolean;
//     id?: string;
//     loader?: LoaderFunction;
//     action?: ActionFunction;
//     element?: React.ReactNode | null;
//     Component?: React.ComponentType | null;
//     errorElement?: React.ReactNode | null;
//     ErrorBoundary?: React.ComponentType | null;
//     handle?: RouteObject["handle"];
//     shouldRevalidate?: ShouldRevalidateFunction;
//     lazy?: LazyRouteFunction<RouteObject>;
//   }
export default User