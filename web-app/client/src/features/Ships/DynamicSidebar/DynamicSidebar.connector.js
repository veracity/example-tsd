import { connect } from "react-redux"
import DynamicSidebar from "./DynamicSidebar"

import * as filters from "../../../ducks/filters.duck"

export default connect((state) => ({
	sidebar: filters.isShipsSidebar(state),
}), (dispatch) => ({
	setShipsSidebar: (isFilters) => dispatch(filters.setShipsSidebar(isFilters))
}))(DynamicSidebar)