const React = require("react");
const e = React.createElement;
const text = require("../string.js");
const Confirmed = props =>
	e(
		"div",
		{ className: "wrapper" },
		e("div", { className: "triangle" }),
		e("img", { src: "/api/v1/logo" }),
		e("h1", {}, text("confirm", "pl")),
		e("p", {}, text("confirmPersonalMessage", "pl", props.email))
	);

module.exports = Confirmed;
