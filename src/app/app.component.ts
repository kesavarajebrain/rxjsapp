import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
declare var adsbygoogle: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {
     // Reload AdSense ads on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.log('AdSense reload error:', e);
        }
      });
  }
}
