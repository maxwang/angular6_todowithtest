import { TestBed, inject } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [TodoDataService]
	});
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {
    
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService)=> {
      	let todo1 = new Todo({ title: 'Test 1', complete: false });
      	let todo2 = new Todo({ title: 'Test 2', complete: true });
      	service.addTodo(todo1);
		service.addTodo(todo2);
		expect(service.getAllTodos()).toEqual([todo1, todo2]);
	}));

  });

  describe('#save(todo)', () => {
	
	it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
		let todo1 = new Todo({ title: 'Test 1', complete: false });
		let todo2 = new Todo({ title: 'Test 2', complete: true });
		service.addTodo(todo1);
		service.addTodo(todo2);
		expect(service.getTodoById(1)).toEqual(todo1);
		expect(service.getTodoById(2)).toEqual(todo2);
	}));

  });

  describe('#deleteTodoById(id)', () => {

	it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
		let todo1 = new Todo({ title: 'Test 1', complete: false });
		let todo2 = new Todo({ title: 'Test 2', complete: true });
		service.addTodo(todo1);
		service.addTodo(todo2);
		expect(service.getAllTodos()).toEqual([todo1, todo2]);
		service.deleteTodoById(1);
		expect(service.getAllTodos()).toEqual([todo2]);
		service.deleteTodoById(2);
		expect(service.getAllTodos()).toEqual([]);
	}));


	it('should not removing anything if todo with corresponding id is not found', 
		inject([TodoDataService], (service: TodoDataService) => {
			let todo1 = new Todo({ title: 'Test 1', complete: false });
			let todo2 = new Todo({ title: 'Test 2', complete: true });
			service.addTodo(todo1);
			service.addTodo(todo2);
			expect(service.getAllTodos()).toEqual([todo1, todo2]);
			service.deleteTodoById(3);
			expect(service.getAllTodos()).toEqual([todo1, todo2]);
		}));


  });

	describe('#updateTodoById(id, value)', () => {

		it('should return todo with corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
			let todo = new Todo({ title: 'Test 1', complete: false });
			service.addTodo(todo);
			let updatedTodo = service.updateTodoById(1, { title: 'Hello 1'});
			expect(updatedTodo.title).toEqual('Hello 1');
		}));

	});

	describe('#toggleTodoComplted(todo', () => {

		it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
			let todo = new Todo({ title: 'Test 1', complete: false });
			service.addTodo(todo);
			let updatedTodo = service.toggleTodoComplete(todo);
			expect(updatedTodo.complete).toBeTruthy();
			service.toggleTodoComplete(todo);
			expect(updatedTodo.complete).toBeFalsy();
		}));


	});

});
