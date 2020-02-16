import { connect } from 'react-redux'
import Task from '../components/Task/Task'

const mapStateToProps = state => ({
  task: state.task ? state.task : "There are currently no submitted tasks.",
})

export default connect(
  mapStateToProps
)(Task)