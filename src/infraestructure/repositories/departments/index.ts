import Departments from '../../../domain/entities/departments';
import { DepartmentsEntity } from '../../../domain/interfaces/departments';
import MongoOrm from '../../database/mongoorm';

class DepartmentsRepository implements DepartmentsEntity {
	private static instance: DepartmentsRepository;
	private constructor() {}

	public static getInstance(): DepartmentsRepository {
		if (!DepartmentsRepository.instance) {
			DepartmentsRepository.instance = new DepartmentsRepository();
		}

		return DepartmentsRepository.instance;
	}

	public async getAll(): Promise<Departments[]> {
		const mongoOrm: MongoOrm = MongoOrm.getInstance();
		const departments: Departments[] = await mongoOrm.get<Departments>(
			'departments'
		);
		return departments;
	}

	public async create(department: Departments): Promise<Departments> {
		const mongoOrm: MongoOrm = MongoOrm.getInstance();
		const departmentsToCreate: Departments = {
			type: department.type,
			bathrooms: department.bathrooms,
			price: department.price,
			rooms: department.rooms,
			parkingSlots: department.parkingSlots,
			lat: department.lat,
			lon: department.lon,
		};
		const id = await mongoOrm.insert<Departments>(
			'departments',
			departmentsToCreate
		);
		department._id = id.toString();
		return department;
	}

	public async update(department: Departments): Promise<boolean> {
		let isUpdated: boolean = false;
		const mongoOrm: MongoOrm = MongoOrm.getInstance();
		const departmentsToUpdate: Departments = {
			type: department.type,
			bathrooms: department.bathrooms,
			price: department.price,
			rooms: department.rooms,
			parkingSlots: department.parkingSlots,
			lat: department.lat,
			lon: department.lon,
		};
		const countRowsUpdated = await mongoOrm.update<Departments>(
			'departments',
			department._id || '',
			departmentsToUpdate
		);
		isUpdated = countRowsUpdated > 0 ? true : false;
		return isUpdated;
	}

	public async delete(_id: string): Promise<boolean> {
		const mongoOrm: MongoOrm = MongoOrm.getInstance();

		const countRowsDeleted = await mongoOrm.delete<Departments>(
			'departments',
			_id
		);

		return countRowsDeleted;
	}
}

export default DepartmentsRepository;
