import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from '../main-header/main-header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  imports: [RouterOutlet, MainHeader, Sidebar],
})
export class MainLayout {}
