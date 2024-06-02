import { Component, OnInit } from '@angular/core';
// import the service
import { DataService } from '../services/data-service';
@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrl: './component-one.component.css'
})
export class ComponentOneComponent implements OnInit {
  inputTxt :string = "";
  componentOneData:string = "";

// inject the service
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.componentOneData = `
    // import the service
      import { DataService } from '../services/data-service';
  
    constructor(private dataService: DataService) { }
  
    ngOnInit() {}
  
    inputTxt :string = "";
  
    sendTxt(){
      this.dataService.raiseDataEmitter(this.inputTxt);
      this.inputTxt =""
    }
    `
     // send code
     this.dataService.codeContent(this.componentOneData)
  }

  sendTxt(){
    this.dataService.raiseDataEmitter(this.inputTxt);
    this.inputTxt =""
  }




}
