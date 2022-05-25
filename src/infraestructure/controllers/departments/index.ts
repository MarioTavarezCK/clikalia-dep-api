import Departments from '../../../domain/entities/departments';
import { DepartmentsEntity } from '../../../domain/interfaces/departments';
import DepartmentsRepository from '../../repositories/departments';

class DepartmentsController implements DepartmentsEntity {
	private static instance: DepartmentsController;

	private constructor() {}

	public static getInstance(): DepartmentsController {
		if (!DepartmentsController.instance) {
			DepartmentsController.instance = new DepartmentsController();
		}

		return DepartmentsController.instance;
	}

	public async getAll(): Promise<Departments[]> {
		const departmentsRepository: DepartmentsRepository =
			DepartmentsRepository.getInstance();
		return await departmentsRepository.getAll();
	}
	public async create(department: Departments): Promise<Departments> {
		const departmentsRepository: DepartmentsRepository =
			DepartmentsRepository.getInstance();
		return await departmentsRepository.create(department);
	}
	public async update(department: Departments): Promise<boolean> {
		const departmentsRepository: DepartmentsRepository =
			DepartmentsRepository.getInstance();
		return await departmentsRepository.update(department);
	}
	public async delete(_id: string): Promise<boolean> {
		const departmentsRepository: DepartmentsRepository =
			DepartmentsRepository.getInstance();
		return await departmentsRepository.delete(_id);
	}
}

export default DepartmentsController;
