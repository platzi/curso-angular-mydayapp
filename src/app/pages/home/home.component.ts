import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [  
      Validators.required,
    ]
  });

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update(prevState => [...prevState, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.mutate(state => {
      state.splice(index, 1);
    })
  }

  updateTask(index: number) {
    /*
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });
    */
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
