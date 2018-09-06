const React = require("react");
const e = React.createElement;

const removeForm = () =>
	e(
		"div",
		{ className: "alert" },
		e(
			"form",
			{ method: "POST", action: "/drop-email" },
			e("p", {}, "Wpisz adres E-mail"),
			e("input", { type: "email", name: "email" }),
			e("input", { type: "submit", value: "Wyślij" })
		)
	);

module.exports = removeForm;
