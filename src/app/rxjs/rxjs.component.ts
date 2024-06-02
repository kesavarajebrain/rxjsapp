import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnInit {
  fruits!: Observable<string>;
  fruitName!: string;
  observable!: string;
  newObservableString!: string;
  //
  newObservable!: Observable<any>;
  ngOnInit(): void {
    this.fruits = new Observable(function (observer) {
      try {
        // observer next means its printing in the period of time
        observer.next('Apple');
        observer.next('Orange');
        observer.next('Banana');
        // setInterval(() => {
        //   observer.next('Orange');
        // },2000)
        // setInterval(() => {
        //   observer.next('Banana');
        // },4000)
      } catch (error) {
        observer.error(error);
      }
    });
    // here we subscribed the data
    this.fruits.subscribe((data) => {
      console.log(data); // [{object,object}]
      this.fruitName = data; // after assigned new var we get the data - latest data will print
    });

    this.observable = `

    // Observable Example 1
    // 3 methods are there - next(), complete(), error ()


    this.fruits = new Observable(function (observer) {
      try {
        // observer next means its printing in the period of time
        observer.next('Apple');
        observer.next('Orange');
        observer.next('Banana');
        // setInterval(() => {
        //   observer.next('Orange');
        // },2000)
        // setInterval(() => {
        //   observer.next('Banana');
        // },4000)
      } catch (error) {
        observer.error(error);
      }
    });

    // here we subscribed the data
    this.fruits.subscribe((data) => {
      console.log(data); // [{object,object}]
      this.fruitName = data; // after assigned new var we get the data - latest data will print
    });
    `;

    // observable
    this.newObservable = new Observable((observer) => {
      observer.next('1');
      observer.next('2');
      observer.next('3');
      observer.next('4');
      // if add error means its wont go next step
      // observer.error(new Error('Something went wrong!'));
      observer.next('5');
      observer.complete();
    });

    this.newObservable.subscribe(
      (data) => {
        console.log(data);
      },
      // error case
      (error) => {
        console.log(error);
      },
      // complete case
      () => {
        console.log('Observable completed!');
      }
    );

    //
    this.newObservableString = `
    // Observable Example 2

    this.newObservable = new Observable((observer) => {
      observer.next('1');
      observer.next('2');
      observer.next('3');
      observer.next('4');
      // if add error means its wont go next step
      // observer.error(new Error('Something went wrong!'));
      observer.next('5')
      observer.complete();
    });

    this.newObservable.subscribe(
      (data) => {
        console.log(data);
      },
      // error case
      (error) => {
        console.log(error);
      },
      // complete case
      () => {
        console.log("Observable completed!");
      }
    );
    `;
  }
}
