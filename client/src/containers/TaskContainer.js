import { connect } from 'react-redux'
import Task from '../components/Task'
import { endRound } from '../actions'

const mapStateToProps = state => ({
  task: state.task,
  isFinished: state.isFinished,
  hasSelected: state.cards.find(c => c.selected)
})

const mapDispatchToProps = dispatch => ({
  endRound: isFinished => {
    console.log(isFinished)
    dispatch(endRound(isFinished))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)