import { TestBed, inject } from '@angular/core/testing';

import { TodoListsService } from './todo-lists.service';

describe('TodoListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListsService]
    });
  });

  it('should be created', inject([TodoListsService], (service: TodoListsService) => {
    expect(service).toBeTruthy();
  }));
});
