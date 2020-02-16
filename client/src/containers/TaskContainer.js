import { connect } from 'react-redux'
import Task from '../components/Task/Task'

const mapStateToProps = state => ({
  task: state.task,
})

export default connect(
  mapStateToProps
)(Task)