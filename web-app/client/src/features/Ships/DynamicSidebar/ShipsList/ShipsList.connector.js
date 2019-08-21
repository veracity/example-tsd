import { connect } from "react-redux"
import ShipsList from "./ShipsList"
import * as ships from "../../../../ducks/ships.duck"


export default connect((state) => ({
	ships: ships.getShips(state)
}), (dispatch) => ({
	fetchShips: () => dispatch(ships.fetchShips())
}))(ShipsList)
