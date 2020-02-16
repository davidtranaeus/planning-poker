import { connect } from 'react-redux'
import Results from '../components/Results/Results'
import { endResults } from '../actions'

const mapStateToProps = state => ({
  results: state.results,
  task: state.task,
  hasEndedResults: state.user.isFinished
})

const mapDispatchToProps = dispatch => ({
  endResults: isFinished => dispatch(endResults(isFinished))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)