// MongoDB
import { Collection, ObjectId } from 'mongodb';
// Connection
import ConnectionDB from './connection';

class MongoOrm {
	private static instance: MongoOrm;

	private constructor() {}

	static getInstance(): MongoOrm {
		if (!MongoOrm.instance) {
			MongoOrm.instance = new MongoOrm();
		}

		return MongoOrm.instance;
	}

	public async get<T>(collection: string): Promise<T[]> {
		const connection = ConnectionDB.getInstance();

		await connection.connectToDB();

		const collectionDocuments: Collection<any> | any = await connection.client
			.db(process.env.DB_COLLECTION)
			.collection(collection)
			.find({})
			.toArray();

		await connection.closeConnectionDB();

		return collectionDocuments;
	}

	public async insert<T>(collection: string, document: any): Promise<string> {
		const connection = ConnectionDB.getInstance();

		await connection.connectToDB();

		const collectionDocument = await connection.client
			.db(process.env.DB_COLLECTION)
			.collection(collection)
			.insertOne(document);
		const inserteredId = await collectionDocument.insertedId.toString();
		await connection.closeConnectionDB();
		return inserteredId;
	}

	public async update<T>(
		collection: string,
		id: string,
		document: any
	): Promise<number> {
		const connection = ConnectionDB.getInstance();

		await connection.connectToDB();
		console.log(document._id);

		const collectionDocument = await connection.client
			.db(process.env.DB_COLLECTION)
			.collection(collection)
			.updateOne({ _id: new ObjectId(id) }, { $set: document });
		await connection.closeConnectionDB();

		return collectionDocument.modifiedCount;
	}

	public async delete<T>(collection: string, _id: string): Promise<boolean> {
		let hasDeleted = false;
		const connection = ConnectionDB.getInstance();

		await connection.connectToDB();

		try {
			const collectionDocument = await connection.client
				.db(process.env.DB_COLLECTION)
				.collection(collection)
				.deleteOne({ _id: new ObjectId(_id) });
			collectionDocument.deletedCount > 0
				? (hasDeleted = true)
				: (hasDeleted = false);
		} catch (error) {
			console.log(error);
		}

		await connection.closeConnectionDB();
		return hasDeleted;
	}
}

export default MongoOrm;
