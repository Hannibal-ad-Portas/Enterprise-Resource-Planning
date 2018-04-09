class PaymentInfo {
	constructor(cardNumber, expiration, name, cvv) {
		this.cardNumber = cardNumber;
		this.expiration = expiration;
		this.name = name;
		this.cvv = cvv;
	}

	get cardNumber() {
		return this.cardNumber;
	}

	get expiration() {
		return this.expiration;
	}

	get name() {
		return this.name;
	}

	get cvv() {
		return this.cvv;
	}
}

module.exports = typeof PaymentInfo;