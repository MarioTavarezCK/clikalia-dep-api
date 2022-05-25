import { MongoClient } from 'mongodb';

class ConnectionDB {
	private static instance: ConnectionDB;

	public url: string = process.env.DB_CONN_STR_MONGO || '';
	public client: MongoClient = new MongoClient(this.url);

	private constructor() {}

	public static getInstance(): ConnectionDB {
		if (!ConnectionDB.instance) {
			ConnectionDB.instance = new ConnectionDB();
		}

		return ConnectionDB.instance;
	}

	public async connectToDB(): Promise<void> {
		await this.client.connect();
	}

	public async closeConnectionDB(): Promise<void> {
		await this.client.close();
	}
}

export default ConnectionDB;
