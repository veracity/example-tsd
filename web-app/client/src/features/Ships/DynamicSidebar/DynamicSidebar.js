import React from "react"
import ShipsList from "./ShipsList"
import ShipFilters from "./ShipFilters"

import PropTypes from "prop-types"

export const DynamicSidebar = (props) => {
	if(!props.shipName || props.sidebar) {
		return <ShipsList shipName={props.shipName}/>
	}
	return <ShipFilters />
}

export default DynamicSidebar

DynamicSidebar.propTypes = {
	shipName: PropTypes.string,
	sidebar: PropTypes.bool,
}