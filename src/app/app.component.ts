import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}
  refCode: any;
  refCodeTwo: any;
  serviceSubjectCode:any;
  serviceEventEmitterCode:any;

  ngOnInit(): void {
    // comp 1
    this.dataService.contentEmitter.subscribe((data) => {
      this.refCode = data;
    });
    // comp 2
    this.dataService.contentEmitterTwo.subscribe((data) => {
      this.refCodeTwo = data;
    });

    // comp 2 service subject data
    this.dataService.serviceSubjectData.subscribe((data) => {
      this.serviceSubjectCode = data;
    })

     // comp 2 service event emitter data
     this.dataService.serviceEmitData.subscribe((data) => {
      this.serviceEventEmitterCode = data;
    })
  }
}
