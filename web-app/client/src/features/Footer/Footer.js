import React from "react"
import PropTypes from "prop-types"

import classes from "./Footer.scss"

export const Footer = ({ copyrightTo }) => (
	<footer className={classes.footer}>
		© {(new Date()).getFullYear()} {copyrightTo}
	</footer>
)
Footer.propTypes = {
	copyrightTo: PropTypes.string.isRequired
}
export default Footer