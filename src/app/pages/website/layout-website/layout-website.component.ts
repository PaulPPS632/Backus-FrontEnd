import { Component } from '@angular/core';
import { HeaderWebsiteComponent } from '../../../components/header-website/header-website.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-website',
  standalone: true,
  imports: [HeaderWebsiteComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout-website.component.html',
  styleUrl: './layout-website.component.css',
})
export class LayoutWebsiteComponent {}
