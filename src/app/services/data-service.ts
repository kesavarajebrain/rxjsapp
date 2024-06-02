import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // name our event emitter and import 
 // dataEmitter = new EventEmitter<any>();
  // subject also same but slightly differ from event emitter
  dataEmitter = new Subject<any>();
  contentEmitter = new EventEmitter<any>();
  contentEmitterTwo = new EventEmitter<any>();

  // service data via subject 
  serviceSubjectData = new Subject<any>();
  // service sample data via event emitter
  serviceEmitData = new EventEmitter<any>();
  // add a function for emit the data
  raiseDataEmitter(data:string){
    // this syntax for subject
    this.dataEmitter.next(data); 
    // this syntax for event emitter 
   // this.dataEmitter.emit(data); 
  }

  // get code from comp 1
  codeContent(codeData:{}){
    this.contentEmitter.emit(codeData)
  }

   // get code from comp 2
   codeContentTwo(codeData:{}){
    this.contentEmitterTwo.emit(codeData)
  }

  // send service data via subject
  sendServiceDataSub(serviceData:any){
    this.serviceSubjectData.next(serviceData)
  }

  sendServiceDataEventEmit(data:any){
    this.serviceEmitData.emit(data)
  }
  }

