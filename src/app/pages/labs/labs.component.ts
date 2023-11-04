import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicación con Angular';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);
  name = signal('Nicolas');
  age = 18;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Nicolas',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  clickHandler() {
    alert('Hola')
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
