const React = require("react");
const e = React.createElement;
const text = require("../string.js");

const loginPanel = () =>
	e(
		"form",
		{ methods: "POST", action: "http://127.0.0.1/api/v1/sessions" },
		e("input", { type: "text", name: "username" }),
		e("input", { type: "password", name: "password" }),
		e("input", { type: "submit", value: "Zaloguj" })
	);

module.exports = loginPanel;
