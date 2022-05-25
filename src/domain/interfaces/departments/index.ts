import Departments from '../../entities/departments';

export interface DepartmentsEntity {
	getAll(): Promise<Departments[]>;
	create(department: Departments): Promise<Departments>;
	update(department: Departments): Promise<boolean>;
	delete(_id: string): Promise<boolean>;
}
