import { connect } from 'react-redux'
import Button from '../components/Button'
import { endTask } from '../actions'

const mapStateToProps = state => ({
  isFinished: state.user.isFinished,
  isDisabled: !state.cards.find(c => c.selected)
})

const mapDispatchToProps = dispatch => ({
  finish: isFinished => dispatch(endTask(isFinished))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)