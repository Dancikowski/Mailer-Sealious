function text(markup, lan, param = null) {
	let result = {
		pl: {
			confirm: "Dziękujemy za potwierdzenie subskrypcji",
			confirmPersonalMessage: `Od tej pory na adres ${param} będą wysyłane najnowsze informacje związane z naszą działalnością.`,
			confirmResign:
				"Wejdź na swój adres e-mail w celu potwierdzenia rezegnacji z subskrypcji",
			emailRemoved: `Twój adres e-mail został pomyślnie usunęty z listy adresowej`,
		},

		en: {
			confirm: "Thank you for confirming the subscription",
			confirmPersonalMessage: `From now on the address ${param} will be sent information related to our activity`,
			confirmResign:
				"Check your email and confirm resign from the subscription",
			emailRemoved: `Your adress e-mail has been removed from our list succesfully`,
		},
	};

	return result[lan][markup];
}

module.exports = text;
