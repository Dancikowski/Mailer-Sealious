const Sealious = require("sealious");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const Confirmed = require("./views/confirmed");
const RemoveForm = require("./views/remove-form");
const css = require("./style/style.js");
const CheckRemoveEmail = require("./views/check-remove-email");
const EmailRemoved = require("./views/email-removed");
const LoginPanel = require("./views/login-panel");

const config = {
	datastore_mongo: {
		port: 27018,
	},
	core: { environment: "production" },
	smtp: {
		host: "localhost",
		port: 1025,
		user: "any",
		password: "any",
	},

	email: {
		from_name: "Sealious test app",
		from_name: "sealious@example.com",
	},

	upload_path: path.resolve("./uploaded_files"),
};
const manifest = {
	name: "What Seal Do?",
	logo: path.resolve(__dirname, "./img/logo.png"),
	version: "1.0",
	default_language: "pl",
	base_url: "http://localhost:8080",
	admin_email: "mr.seal.api.admin@sealcode.org",
	colors: { primary: "#8BBAC4" },
};

const app = new Sealious.App(config, manifest);

const emails = app.createChip(Sealious.Collection, {
	name: "emails",
	fields: [
		{ name: "email", type: "email", required: true },
		{ name: "accepted", type: "boolean", required: true },
		{ name: "confirmToken", type: "secret-token", required: true },
		{ name: "removeToken", type: "secret-token", required: true },
	],
	access_strategy: { default: "super", create: "public" },
});

app.addHook(
	new app.Sealious.EventMatchers.Collection({
		when: "before",
		collection_name: "emails",
		action: "create",
	}),
	async (emitted_event, body) => {
		return {
			...body,
			accepted: false,
			confirmToken: " ",
			removeToken: " ",
		};
	}
);

app.addHook(
	new app.Sealious.EventMatchers.Collection({
		when: "after",
		collection_name: "emails",
		action: "create",
	}),

	async (emitted_event, resource) => {
		const token = (await app.run_action(
			new app.Sealious.SuperContext(emitted_event.metadata.context),
			["collections", "emails", resource.id],
			"show"
		)).body.confirmToken;
		const message = await app.EmailTemplates.Simple(app, {
			to: resource.body.email,
			subject: "Potwierdź subskrypcję",
			text:
				"Dziękujemy, potwierdź subskrypcję klikacjąc w przycisk poniżej",
			buttons: [
				{
					text: "Potwierdź",
					href: `http://localhost:8080/confirm-email?token=${token}`,
				},
			],
		});

		message.send(app);
	}
);

function render_form(markup, title) {
	return `<!DOCTYPE html>
	<html>
	<style>
	${css(app.manifest.colors.primary)}
	</style>

	<meta charset="utf-8">

	<title>${title}</title>
	${markup}
	</html>`;
}

app.WwwServer.custom_route(
	"GET",
	"/confirm-email",
	async (app, context, params) => {
		const result = await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails"],
			"show",
			{ filter: { confirmToken: params.token } }
		);
		const markup = ReactDOMServer.renderToString(
			React.createElement(Confirmed, {
				email: result.items[0].body.email,
				logo: app.manifest.logo,
			})
		);

		await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails", result.items[0].id],
			"edit",
			{ accepted: true }
		);
		return new app.Sealious.VirtualFile(
			render_form(markup, "Subskrypcja potwierdzona"),
			"text/html"
		);
	}
);

app.WwwServer.custom_route("GET", "/remove-email", (app, context, params) => {
	const removeForm = ReactDOMServer.renderToString(
		React.createElement(RemoveForm)
	);
	return new app.Sealious.VirtualFile(
		render_form(removeForm, "Anulowanie subskrypcji"),
		"text/html"
	);
});

app.WwwServer.custom_route(
	"POST",
	"/drop-email",
	async (app, context, params) => {
		const {
			items: [resource],
		} = await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails"],
			"show",
			{ filter: { email: params.email } }
		);

		const check = ReactDOMServer.renderToString(
			React.createElement(CheckRemoveEmail)
		);

		console.log(resource.body.removeToken);
		const message = await app.EmailTemplates.Simple(app, {
			to: resource.body.email,
			subject: "Anuluj subskrypcje",
			text: "Anuluj subskrypcję klikacjąc w przycisk poniżej",
			buttons: [
				{
					text: "Potwierdź",
					href: `http://localhost:8080/confirm-remove-email?token=${
						resource.body.removeToken
					}`,
				},
			],
		});

		message.send(app);

		return new app.Sealious.VirtualFile(
			render_form(check, "Anulowanie subkrypcji"),
			"text/html"
		);
	}
);

app.WwwServer.custom_route(
	"GET",
	"/confirm-remove-email",
	async (app, context, params) => {
		const {
			items: [{ id }],
		} = await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails"],
			"show",
			{ filter: { removeToken: params.token } }
		);

		await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails", id],
			"delete"
		);

		const emailRemoved = ReactDOMServer.renderToString(
			React.createElement(EmailRemoved)
		);
		return new app.Sealious.VirtualFile(
			render_form(emailRemoved, "Anulowanie subskrypcji"),
			"text/html"
		);
	}
);

app.WwwServer.custom_route(
	"GET",
	"/admin-dashboard",
	async (app, context, params) => {
		await app.run_action(
			new app.Sealious.SuperContext(context),
			["collections", "emails"],
			"show",
			{ filter: { confirmToken: true } }
		);

		const loginPanel = ReactDOMServer.renderToString(
			React.createElement(LoginPanel)
		);

		return new app.Sealious.VirtualFile(
			render_form(loginPanel),
			"text/html"
		);
	}
);

app.start();
