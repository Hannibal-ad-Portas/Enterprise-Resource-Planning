class PaymentInfoType {
	constructor(number, holder, exp, cvv) {
		this.cardNumber = number;
		this.cardHolder = holder;
		this.expiration = exp;
		this.cvv = cvv;
	}
}

module.exports = PaymentInfoType;