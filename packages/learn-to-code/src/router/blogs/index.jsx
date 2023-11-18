/**
 * @fileoverview blog dashboard valid routes
 */
import Feedback from '../../pages/Feedback/404'
import Blogs from '../../pages/Blogs'
import navLinks from '../links'
const User = {
    path: "/blogs",
    element: <Blogs links={navLinks}/>,
    errorElement: <Feedback title={"Not a valid blog"}/> 
}
export default User