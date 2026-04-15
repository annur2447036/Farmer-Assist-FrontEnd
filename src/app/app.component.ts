import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './Components/admin/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projectFrontend';

  darkMode = false;

toggleDarkMode() {
  this.darkMode = !this.darkMode;

  const body = document.body;

  if (this.darkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}
}
