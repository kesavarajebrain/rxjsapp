import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
// service
import { DataService } from './services/data-service';
import { ObservableVsSubjectComponent } from './observable-vs-subject/observable-vs-subject.component'; 
@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    ComponentOneComponent,
    ComponentTwoComponent,
    ObservableVsSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
