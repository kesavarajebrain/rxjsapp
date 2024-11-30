import { Component } from '@angular/core';
import {
  concatMap,
  concatMapTo,
  exhaustMap,
  filter,
  interval,
  map,
  mergeMap,
  mergeMapTo,
  of,
  switchMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-higher-order-operators',
  templateUrl: './higher-order-operators.component.html',
  styleUrl: './higher-order-operators.component.css',
})
export class HigherOrderOperatorsComponent {
  mergeMapToArr: any[] = [];
  concatMapToArr: any[] = [];
  switchMapArr: any[] = [];

  // higher order observables
  getCallById() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        map((x) => {
          return of(x * 10); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data); // here it will return observable
        data.subscribe((val) => {
          console.log(val); // OUTPUT will print here
        });
      });
  }

  getApiCallById() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        map((x) => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data); // here it will return observable
        data.subscribe((val) => {
          console.log(val); // AJAX Response will print here
        });
      });
  }

  // mergeMap - operator
  // this operator will subscribe and extract data and gives consolidated result
  // this will emits the which is completed first , not in the order wise
  mergeMapOperator() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        mergeMap((x) => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data); // MergeMap will subscribe and extract data and gives data
        console.log(data.response);
      });
  }

  // mergeMapTo - operator
  // this is similar to mapTo , it will emits data based on source observable
  mergeMapToOperator() {
    of(1, 2, 3, 4, 5)
      .pipe(mergeMapTo(ajax(`https://jsonplaceholder.typicode.com/posts/1`)))
      .subscribe((data) => {
        console.log(data.response);
        this.mergeMapToArr.push(data.response);
      });
  }

  // concatMap - operator
  // this operator will subscribe and extract data and gives consolidated result
  // this will emits the data in the order wise
  concatMapOperator() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        concatMap((x) => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data); // concatMap will subscribe and extract data and gives data
        console.log(data.response);
      });
  }

  // concatMapTo - operator
  // this is similar to mergeMapTo , it will emits data based on source observable order
  concatMapToOperator() {
    of(1, 2, 3, 4, 5)
      .pipe(concatMapTo(ajax(`https://jsonplaceholder.typicode.com/posts/1`)))
      .subscribe((data) => {
        console.log(data.response);
        this.concatMapToArr.push(data.response);
      });
  }

  // exhaustMap - operator
  // exhaustMap will emits the only one data at the time, inner observable takes the data to emit means other outer observable will exhaust
  exhaustMapOperator() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        exhaustMap((x) => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data);
        console.log(data.response);
      });

    // Using Interval
    // here based on the interval what data getting in the outer observable that only going to inner obs then til that inner obs complete that process will emit the data, in this process any other data emitted from the outer obs that will exhaust or not considered.
    // interval(1000) // outer observable
    //   .pipe(
    //     filter((x) => x > 0),
    //     exhaustMap((x) => {
    //       return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //     console.log(data.response);
    //   });
  }

  // switchMap - operator
  // outer observable emits the first data, then that data going to inner obs before completing the progress second data emits from the first obs means it cancel the current progress and switch to next progress, it keep on switches based on first obs
  switchMapOperator() {
    of(1, 2, 3, 4, 5, 6, 7) // outer observable
      .pipe(
        switchMap((x) => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${x}`); // inner observable
        })
      )
      .subscribe((data) => {
        console.log(data);
        console.log(data.response);
        this.switchMapArr.push(data.response);
      });
  }
}
