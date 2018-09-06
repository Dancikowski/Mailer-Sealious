const React = require("react");
const e = React.createElement;
const text = require("../string.js");

const removeForm = () =>
	e("div", { className: "alert" }, e("p", {}, text("confirmResign", "pl")));

module.exports = removeForm;
