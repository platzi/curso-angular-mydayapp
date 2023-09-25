import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: true
    },
    {
      id: Date.now(),
      title: 'Crear componenentes',
      completed: false
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
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
    this.tasks.mutate(state => {
      const currentTask = state[index];
      state[index] = {
        ...currentTask,
        completed: !currentTask.completed
      }
    })
  }

}
