import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}
  refCode: any;
  refCodeTwo: any;
  serviceSubjectCode:any;
  serviceEventEmitterCode:any;
  fruits!: Observable<string>;
  fruitName!: string;
  observable!: string;
  newObservableString!: string;
  arrayObservable: any;
  observableDataArr: any[] = [];
  newObservable!: Observable<any>;

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

    // observable
    this.arrayObservable = new Observable((obs) => {
      // added upto 5 like below its printed all at a time so we added set timeout
      // obs.next(1)
      setTimeout(() => {
        obs.next(1);
      }, 1000);
      setTimeout(() => {
        obs.next(2);
      }, 2000);
      setTimeout(() => {
        obs.next(3);
      }, 3000);
      setTimeout(() => {
        obs.next(4);
      }, 4000);
      setTimeout(() => {
        obs.next(5);
      }, 5000);
    });
  }

  loadObservableArr() {
    // observer
    this.arrayObservable.subscribe((val: any) => {
      console.log(val);
      this.observableDataArr.push(val);
    });
  }
}
