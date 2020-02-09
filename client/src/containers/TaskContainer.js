import { connect } from 'react-redux'
import Task from '../components/Task'
import { endRound } from '../actions'

const mapStateToProps = state => ({
  task: state.task,
  isFinished: state.user.isFinished
})

const mapDispatchToProps = dispatch => ({
  endRound: isFinished => dispatch(endRound(isFinished))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)