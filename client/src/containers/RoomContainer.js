import { connect } from 'react-redux'
import Room from '../components/Room/Room'

const mapStateToProps = state => ({
  currentView: state.view
})

export default connect(
  mapStateToProps
)(Room)