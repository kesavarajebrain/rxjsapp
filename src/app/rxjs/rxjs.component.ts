import { Component, OnInit } from '@angular/core';
import { Observable, filter, from, map, of } from 'rxjs';

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
  arrayObservable: any;
  observableDataArr: any[] = [];
  operartorOfArr: any[] = [];
  operartorFromArr: any[] = [];
  operartorMapArr: any[] = [];
  operartorFilterArr: any[] = [];
  commonArr: any[] = [1, 2, 3, 4, 5];
  //of
  ofArray = [1, 2, 3, 4, 5, 'hai', { name: 'test' }];
  //from
  fromArray = [1, 2, 3, 4, 'hello'];
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

  // of operator its also observable
  ofObservable = of(this.ofArray);
  ofOperator() {
    this.ofObservable.subscribe((val: any) => {
      this.operartorOfArr.push(val);
    });
  }

  // from operator
  fromObservable = from(this.fromArray);
  fromOperator() {
    this.fromObservable.subscribe((val: any) => {
      this.operartorFromArr.push(val);
    });
  }

  // map operator - use pipe for this
  mapObservable = from(this.commonArr);
  mapOperator() {
    this.mapObservable
      .pipe(
        map((val) => {
          return val * 10;
        })
      )
      .subscribe((data) => {
        this.operartorMapArr.push(data);
      });
  }

  // filter operator - use pipe for this
  filterObservable = from(this.commonArr);
  filterOperator() {
    this.filterObservable
      .pipe(
        filter((val, i) => {
          console.log(val % 0 === 0);
          return val % 2 === 1;
        })
      )
      .subscribe((data) => {
        this.operartorFilterArr.push(data);
      });
  }
}
