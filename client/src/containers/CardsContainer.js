import { connect } from 'react-redux'
import Cards from '../components/Cards'
import { selectCard } from '../actions'

const mapStateToProps = state => ({
  cards: state.cards,
  isFinished: state.isFinished,
})

const mapDispatchToProps = dispatch => ({
  selectCard: cardId => dispatch(selectCard(cardId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)