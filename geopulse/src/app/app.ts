import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './features/maps/map.component';
import { AssistantComponent } from './features/assistant/assistant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, AssistantComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>GeoPulse-AI</h1>
      </header>
      <main>
        <div class="map-section">
          <app-map></app-map>
        </div>
        <div class="assistant-section">
          <app-assistant></app-assistant>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    header {
      background: #3f51b5;
      color: white;
      padding: 0 16px;
      height: 64px;
      display: flex;
      align-items: center;
    }
    main {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .map-section {
      flex: 2;
    }
    .assistant-section {
      flex: 1;
      border-left: 1px solid #ccc;
    }
  `]
})
export class AppComponent {
  title = 'geopulse';
}
