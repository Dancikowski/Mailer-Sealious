import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
	render() {
		return (
			<div>
				<form
					action="http://127.0.0.1:8080/api/v1/sessions"
					method="POST"
				>
					<input type="text" name="username" />
					<input type="password" name="password" />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
