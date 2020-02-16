import { connect } from 'react-redux'
import Room from '../components/Room/Room'
import { submitTask } from '../actions'

const mapStateToProps = state => ({
  currentView: state.view,
  taskExists: state.task ? true : false
})

const mapDispatchToProps = dispatch => ({
  submitTask: data => dispatch(submitTask(data.task))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)