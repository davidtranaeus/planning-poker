import { connect } from 'react-redux'
import SubmitTask from '../components/SubmitTask/SubmitTask.js'
import { submitTask } from '../actions'

// const mapStateToProps = state => ({
//   results: state.results,
//   task: state.task,
//   hasEndedResults: state.user.isFinished
// })

const mapDispatchToProps = dispatch => ({
  submitTask: task => dispatch(submitTask(task))
})

export default connect(
  null,
  mapDispatchToProps
)(SubmitTask)