import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { AssistantPanel } from '../assistant-panel/assistant-panel';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, Header, Sidebar, AssistantPanel, Footer],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss']
})
export class Shell {
  isSidebarOpen = signal(true);
}
