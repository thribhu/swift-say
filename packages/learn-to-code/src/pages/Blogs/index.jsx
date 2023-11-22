import PropTypes from 'prop-types'
import withNavbar from '../../components/WithNavbar'
import Filter from '../../components/Filter'
// import Blogs from './Blogs'

function BlogList(props){
    return (
        <Filter/>
    )
}
BlogList.propTypes = {
    childtren: PropTypes.node
}
export default withNavbar(BlogList)