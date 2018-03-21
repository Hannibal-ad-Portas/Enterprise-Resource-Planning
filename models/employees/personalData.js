class PersonalData {
	constructor(fName, lName, street, streetAltFirst, streetAltSecond, city, state, zip, ssn, dob) {
		this.firstName = fName;
		this.lastName = lName;
		this.streetAddress = street;
		this.streetAddressFirstAlternate = streetAltFirst;
		this.streetAddressSecondAlternate = streetAltSecond;
		this.cityAddress = city;
		this.stateAddress = state;
		this.zipCode = zip;
		this.ssn = ssn;
		this.dob = dob;
	}
}

module.exports.PersonalData;