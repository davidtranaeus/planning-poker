import { connect } from 'react-redux'
import Results from '../components/Results'
import { endResults } from '../actions'

const mapStateToProps = state => ({
  results: state.results,
  hasEndedResults: state.user.isFinished
})

const mapDispatchToProps = dispatch => ({
  endResults: isFinished => dispatch(endResults(isFinished))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)