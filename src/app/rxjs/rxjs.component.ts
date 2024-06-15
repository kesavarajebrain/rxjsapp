import { Component, OnInit } from '@angular/core';
import {
  Observable,
  concat,
  count,
  defaultIfEmpty,
  distinct,
  filter,
  find,
  findIndex,
  first,
  from,
  interval,
  last,
  map,
  max,
  merge,
  min,
  of,
  range,
  skip,
  take,
  tap,
  toArray,
  zip,
} from 'rxjs';

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
  commonArrNames: any[] = [
    'Kurinji',
    'Mullai',
    'Marudham',
    'Neithal',
    'Paalai',
  ];
  //of
  ofArray = [1, 2, 3, 4, 5, 'hai', { name: 'test' }];
  //from
  fromArray = [1, 2, 3, 4, 'hello'];
  newObservable!: Observable<any>;
  operatorRangeArr: any[] = [];
  operatorDistinctArr: any[] = [];
  operatorFirstArr: any[] = [];
  operatorLastArr: any[] = [];
  operatorSkipArr: any[] = [];
  operatorTakeArr: any[] = [];
  operatorIntervalArr: any[] = [];
  operatorToArrayArr: any[] = [];
  operartorTapArr: any[] = [];
  operartorConcatArr: any[] = [];
  operartorMergeArr: any[] = [];
  operartorZipArr: any[] = [];
  operatordefaultIfEmptyArr: any;
  operatorFindArr: any[] = [];
  operatorFindIndexArr: any[] = [];
  operatorCountArr: any[] = [];
  operatorMin?: number;
  operatorMax?: number;
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
    //include another operator like map so we use pipe
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
    //include another operator like filter so we use pipe
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

  // range operator
  rangeOperator() {
    // range (starting number , no of items from the starting number)
    const rangeObservable = range(10, 2);
    rangeObservable.subscribe((val) => {
      this.operatorRangeArr.push(val);
      console.log('Range =>' + val);
    });
  }

  // distinct operator
  distinctOperator() {
    // here declared one array with duplicates values, for the each value itration we used from operator
    const distinctArr = from([
      1, 2, 1, 1, 3, 4, 4, 5, 5, 5, 5, 5, 6, 7, 7, 8, 8, 88, 9,
    ]);
    //include another operator like distinct so we use pipe the we subscribed - its takes only unique values
    distinctArr.pipe(distinct()).subscribe((val) => {
      this.operatorDistinctArr.push(val);
    });
  }

  // first operator
  firstOperator() {
    // here declared one arr with 5 names - this operator emits the first value
    const firstOperatortArr = from(this.commonArrNames);
    firstOperatortArr.pipe(first()).subscribe((val) => {
      this.operatorFirstArr.push(val);
    });
  }

  // last operator
  lastOperator() {
    // here declared one arr with 5 names - this operator emits the last value
    const lastOperatortArr = from(this.commonArrNames);
    lastOperatortArr.pipe(last()).subscribe((val) => {
      this.operatorLastArr.push(val);
    });
  }

  // skip operator
  skipOperator() {
    // here declared one arr with 5 names - skip operator skips from the start in the given position
    const skipOperatortArr = from(this.commonArrNames);
    skipOperatortArr.pipe(skip(3)).subscribe((val) => {
      this.operatorSkipArr.push(val);
    });
  }

  // take operator
  takeOperator() {
    const takeOperatortArr = from(this.commonArrNames);
    // take operator takes values from the starting, in the given position
    takeOperatortArr.pipe(take(6)).subscribe((val) => {
      this.operatorTakeArr.push(val);
    });
  }

  // inteval
  intervalOperator() {
    // interval operator keep on trigger with the given interval of time
    const intervalArr = interval(1000);
    // this is keep on trigger because we are not add condition
    intervalArr.subscribe((val) => {
      this.operatorIntervalArr.push(val);
    });
    // here we can combine take operator also
    // intervalArr.pipe((take(5))).subscribe((val) => {
    //   this.operatorIntervalArr.push(val);
    // });
  }

  // toArray operator
  toArrayOperator() {
    const dataArr = of(1, 2, 3, 'Hello', 'world!');
    // toArray operator format data into array format
    dataArr.pipe(toArray()).subscribe((val) => {
      console.log('toArray operator => ', val);
      this.operatorToArrayArr.push(val);
    });
  }

  // tap operator
  tapObservable = from(this.commonArr);
  tapOperator() {
    //include another operator like map so we use pipe
    this.tapObservable
      .pipe(
        // tap operator used to there is modification of original data
        tap((val) => {
          return val * 10;
        })
      )
      .subscribe((data) => {
        this.operartorTapArr.push(data);
      });
  }

  // concat operator
  concatOperator() {
    const Arr = from(this.commonArrNames);
    // first operator - operator 2
    const operator2 = Arr.pipe(first());
    // last operator - operator 1
    const operator1 = Arr.pipe(last());
    //take operator - operator 3
    const operator3 = Arr.pipe(take(3));
    // concat operator concat multiple operators , with one subscribe its all the operators data
    const concatOpertor = concat(operator1, operator2, operator3);
    concatOpertor.subscribe((val) => {
      this.operartorConcatArr.push(val);
    });
  }

  // merge operator
  mergeOperator() {
    const Arr = from(this.commonArrNames);
    // first operator - operator 2
    const operator2 = Arr.pipe(first());
    // last operator - operator 1
    const operator1 = Arr.pipe(last());
    //take operator - operator 3
    const operator3 = Arr.pipe(take(3));
    // concat operator concat multiple operators , with one subscribe its all the operators data
    const concatOpertor = merge(operator1, operator2, operator3, 3);
    concatOpertor.subscribe((val) => {
      this.operartorMergeArr.push(val);
    });
  }

  // zip operator
  zipOperator() {
    let age$ = of(18, 31, 25, 43);
    let name$ = of('Agran', 'Aruvi', 'Thenmozhi', 'Sembian');
    let city$ = of('Maduari', 'Chennai', 'Trichy', 'Thanjavur');
    let status$ = of(true, false, true, false);
    // zip operator forms data if all the values matched in the given order
    // map operator formats
    zip(name$, age$, city$, status$)
      .pipe(map(([name, age, city, status]) => ({ name, age, city, status })))
      .subscribe((val) => {
        this.operartorZipArr.push(val);
        console.log(val);
      });
  }

  // defaultIfEmpty operator
  defaultIfEmptyOperator() {
    const defaultArr = of(1, 2, 3);
    // this operator used to if there is no data or there is no matched data based on the condition it will emit what we given
    defaultArr
      .pipe(
        filter((x) => x > 5),
        defaultIfEmpty('There is no matches or its empty')
      )
      .subscribe((val) => {
        console.log(val);
        this.operatordefaultIfEmptyArr = val;
      });
  }

  // find operators
  findOperator() {
    const dataArr = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    // find operator emits only one data with the satisfied condition
    dataArr.pipe(find((x) => x % 2 === 0)).subscribe((val) => {
      this.operatorFindArr.push(val);
    });
  }

  // findIndex operator
  findIndexOperator() {
    const dataArr = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    // findIndex operator emits only one data with the satisfied condition's position
    dataArr.pipe(findIndex((x) => x % 2 === 0)).subscribe((val) => {
      this.operatorFindIndexArr.push(val);
    });
  }

  // count operator
  countOperator() {
    const dataArr = of(12, 43, 42, 56, 22, 12, 44, 90);
    // count operator emits how many counts
    dataArr.pipe(count()).subscribe((val) => {
      this.operatorCountArr.push(val);
    });
  }

  // min operator
  minOperator() {
    const dataArr = of(12, 43, 42, 56, 22, 12, 44, 90);
    // min operator emits min value
    dataArr.pipe(min()).subscribe((val) => {
      this.operatorMin =val;
    });
  }

   // min operator
   maxOperator() {
    const dataArr = of(12, 43, 42, 56, 22, 12, 44, 90,100);
    // min operator emits maximum value
    dataArr.pipe(max()).subscribe((val) => {
      this.operatorMax =val;
    });
  }
}
