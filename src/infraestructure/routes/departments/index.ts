import { Request, Response, Router } from 'express';
import Departments from '../../../domain/entities/departments';
import DepartmentsController from '../../controllers/departments';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
	const departmentsController: DepartmentsController =
		DepartmentsController.getInstance();
	const departments: Departments[] = await departmentsController.getAll();
	response.send(departments);
});

router.post('/', async (request: Request, response: Response) => {
	const departmentsController: DepartmentsController =
		DepartmentsController.getInstance();
	const departments: Departments = await departmentsController.create(
		request.body
	);
	response.send(departments);
});

router.put('/', async (request: Request, response: Response) => {
	const departmentsController: DepartmentsController =
		DepartmentsController.getInstance();
	const hasUpdated: boolean = await departmentsController.update(request.body);
	response.send(hasUpdated);
});

router.delete('/:id', async (request: Request, response: Response) => {
	const departmentsController: DepartmentsController =
		DepartmentsController.getInstance();
	console.log(request.params.id);

	const hasDeleted: boolean = await departmentsController.delete(
		request.params.id?.toString() || ''
	);
	response.send(hasDeleted);
});

export default router;
