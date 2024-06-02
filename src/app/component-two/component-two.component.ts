import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrl: './component-two.component.css'
})
export class ComponentTwoComponent implements OnInit{
  dataFromOtherComponent: any;
  componentTwoData: any;
  serviceDataSubject:any;
  serviceDataEventEmitter:any;

  constructor(private dataService:DataService) {  }

  ngOnInit() {
    this.componentTwoData = `
    import { DataService } from '../services/data-service';

    constructor(private dataService:DataService) {  }

    ngOnInit() {
      this.dataService.dataEmitter.subscribe(data => {
        this.dataFromOtherComponent = data;
      })
    }
    `
    this.dataService.dataEmitter.subscribe(data => {
      this.dataFromOtherComponent = data;
    })

    this.dataService.codeContentTwo(this.componentTwoData);

    this.serviceDataSubject = `
    import { Subject } from 'rxjs';

    // subject also same but slightly differ from event emitter
    // service data via subject 
       serviceData = new Subject<any>();

    // send service data via subject
        sendServiceData(serviceData:any){
          this.serviceData.next(serviceData)
        }
    `
    this.dataService.sendServiceDataSub(this.serviceDataSubject);

    this.serviceDataEventEmitter = `
      import { EventEmitter, Injectable } from '@angular/core';

      contentEmitter = new EventEmitter<any>();

    // get code from comp 1
        codeContent(codeData:{}){
          this.contentEmitter.emit(codeData)
        }
    `

    this.dataService.sendServiceDataEventEmit(this.serviceDataEventEmitter);

  }
}
