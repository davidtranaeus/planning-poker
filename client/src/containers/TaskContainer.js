import { connect } from 'react-redux'
import Task from '../components/Task'
import { endRound } from '../actions'

const mapStateToProps = state => ({
  task: state.task.text,
  finished: state.task.finished
})

const mapDispatchToProps = dispatch => ({
  endRound: () => dispatch(endRound())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)