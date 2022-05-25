class Departments {
	_id?: string;
	price: string;
	type: 'onSale' | 'rent';
	rooms: number;
	bathrooms: number;
	parkingSlots: number;
	lat: string;
	lon: string;
	constructor(
		price: string,
		type: 'onSale' | 'rent',
		rooms: number,
		bathrooms: number,
		parkingSlots: number,
		lat: string,
		lon: string,
		_id?: string
	) {
		if (_id) this._id = _id;
		this.price = price;
		this.type = type;
		this.rooms = rooms;
		this.bathrooms = bathrooms;
		this.parkingSlots = parkingSlots;
		this.lat = lat;
		this.lon = lon;
	}
}

export default Departments;
