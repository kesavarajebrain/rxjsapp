import { Component, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  concat,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  distinct,
  distinctUntilChanged,
  filter,
  find,
  findIndex,
  first,
  forkJoin,
  from,
  fromEvent,
  iif,
  interval,
  last,
  map,
  max,
  merge,
  min,
  of,
  partition,
  race,
  range,
  skip,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  toArray,
  withLatestFrom,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnDestroy {
  evensArr: any = [];
  oddsArr: any = [];
  
  private searchSubject = new Subject<string>();
  private searchDebounceSubject = new Subject<string>();
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)
  inputDebounceTime: string = '';
  inputDebounce: string = '';

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
  fromArray = [1, 2, 3, 4, 'hello', { name: 'test1' }];
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
  operatordefaultIfEmptyArr: any[] = [];
  operatorFindArr: any[] = [];
  operatorFindIndexArr: any[] = [];
  operatorCountArr: any[] = [];
  operatorMin?: number;
  operatorMax?: number;
  operatorCombineLatestArr: any[] = [];
  operartorForkJoinArr: any[] = [];
  operatorRaceArr: any[] = [];
  operatorStartWithArr: any[] = [];
  operatorWithLatestFromArr: any;

  takeUntil$ = new Subject<boolean>();
  takeUntilInterval = interval(2000);
  searchValue?: string;
  searchVal?: string;
  debounceSearchVal?: string;
  takeLastDataArr?: any = [];
  radioFlag: any;
  iffOperatorData: any;
  takeUntilData: any =[];
  disUtlCgeOprArr: any = [];
  

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
    const rangeObservable = range(10, 4); // here 10 means from 13 to 11 - 4digits only
    rangeObservable.subscribe((val) => {
      this.operatorRangeArr.push(val);
      console.log('Range =>' + val);
    });
  }

  // distinct operator
  distinctOperator() {
    // here declared one array with duplicates values, for the each value itration we used from operator
    const distinctArr = from([
      1, 2, 1, 1, 3, 4, 4, 5, 5, 5, 5, 5, 6, 7, 7, 8, 8, 88, 9, 100,
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
    takeOperatortArr.pipe(take(3)).subscribe((val) => {
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
    const dataArr = of(1, 2, 3, 'Hello', 'world!', { name: 'name' });
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
    // merge operator merge multiple operators , with one subscribe its all the operators data
    const concatOpertor = merge(operator1, operator2, operator3, 3);
    concatOpertor.subscribe((val) => {
      this.operartorMergeArr.push(val);
    });
  }

  //IMPORTANT ****** difference between merge and concat
  //const obs1 = of(1, 2, 3);
  //const obs2 = of(4, 5, 6);

  // concat: 1, 2, 3, 4, 5, 6
  //concat(obs1, obs2).subscribe(console.log);

  // merge: 1, 4, 2, 5, 3, 6 (order may vary)
  //merge(obs1, obs2).subscribe(console.log);

  // zip operator
  zipOperator() {
    let age$ = of(18, 31, 25, 43);
    let name$ = of('Agran', 'Aruvi', 'Thenmozhi', 'Sembian');
    let city$ = of('Maduari', 'Chennai', 'Trichy', 'Thanjavur');
    let status$ = of(true, false, true, false); // if we remove any one from any object means entire column will omit
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
        filter((x) => x > 1), // change filter condition, here x > 1 means , 2,3 are greater than 1 so 2 and 3 will emit
        defaultIfEmpty('There is no matches or its empty')
      )
      .subscribe((val) => {
        console.log(val);
        this.operatordefaultIfEmptyArr.push(val);
      });
  }

  // find operators
  findOperator() {
    const dataArr = of(3, 11, 2, 3, 4, 5, 6, 7, 8, 9);
    // find operator emits only one data with the first satisfied condition
    // here logic is find even number so the first even number is 2
    dataArr.pipe(find((x) => x % 2 === 0)).subscribe((val) => {
      this.operatorFindArr.push(val);
    });
  }

  // findIndex operator
  findIndexOperator() {
    const dataArr = of(3, 11, 3, 24, 4, 5, 6, 7, 8, 9);
    // findIndex operator emits only one data with the satisfied condition's position
    // here logic is find even number so the first even number position is 24 so its return 3
    dataArr.pipe(findIndex((x) => x % 2 === 0)).subscribe((val) => {
      this.operatorFindIndexArr.push(val);
    });
  }

  // count operator
  countOperator() {
    const dataArr = of(12, 43, 42, 56, 22, 12, 44, 90, '33', { name: 'raj' });
    // count operator emits how many counts
    dataArr.pipe(count()).subscribe((val) => {
      this.operatorCountArr.push(val);
    });
  }

  // min operator
  minOperator() {
    let dataArr = of(12, 43, 42, 56, 22, 12, 44, 90, 1);
    // min operator emits min value
    dataArr.pipe(min()).subscribe((val) => {
      console.log(val);
      this.operatorMin = val;
    });
  }

  // max operator
  maxOperator() {
    let dataArr = of(12, 43, 42, 56, 22, 12, 44, 90, 102);
    // max operator emits maximum value
    dataArr.pipe(max()).subscribe((val) => {
      this.operatorMax = val;
    });
  }

  // combineLatest operator
  combineLatestOperator() {
    // this operator helps to use multiple observable and its emits all latest values from the all observable
    let array = [{ name: 'Cheran' }, { name: 'Chozlan' }, { name: 'Pandiyan' }];
    const firstObs = interval(1000).pipe(map((x) => x + 1));
    const secondObs = interval(1500).pipe(map((x) => x + 100));
    const thirdObs = of(array).pipe(map((array) => array.map((x) => x.name)));
    const combineObs = combineLatest(firstObs, secondObs, thirdObs);
    combineObs.pipe(take(3)).subscribe((value) => {
      this.operatorCombineLatestArr.push(value);
      console.log('*********', value);
    });
  }

  // forkJoin operator
  forkJoinOperator() {
    this.operartorForkJoinArr.push('started the operation');
    // this operator wait with all observables to complete and emit final values from the all observable
    const firstObs1 = interval(1000).pipe(take(5));
    const secondObs2 = interval(2000).pipe(
      take(10),
      map((x) => x + 1)
    );
    const forkJoinObs = forkJoin(firstObs1, secondObs2);
    forkJoinObs.subscribe((val) => {
      console.log('waiting for complete the operation', val);
      this.operartorForkJoinArr.push(val);
    });
  }

  // race operator
  raceOperator() {
    // this operator emits which observable is completes first, that only its emits and stops further emit like racing
    const raceObs1 = interval(1000).pipe(
      map((x) => x + 10),
      take(5)
    );
    const raceObs2 = interval(5000).pipe(take(5)); // it have 5sec interval time so its emits previous one
    const raceObs = race(raceObs1, raceObs2);
    raceObs.subscribe((val) => {
      this.operatorRaceArr.push(val);
      console.log(val);
    });
  }

  // startWith operator
  startWithOperator() {
    let name$ = of('Agran', 'Aruvi', 'Thenmozhi', 'Sembian');
    // this operator emits first before other observable emits
    combineLatest(name$)
      .pipe(startWith('Start with operator'))
      .subscribe((val) => {
        this.operatorStartWithArr.push(val);
        console.log(val);
      });
  }

  withLatestFromOperator() {
    let color$ = of('Red', 'Green', 'Blue', 'Pink');
    let logo$ = of('Fish', 'Dog', 'Lion', 'tiger');
    color$.pipe(withLatestFrom(logo$)).subscribe(([color, logo]) => {
      this.operatorWithLatestFromArr = `${color} shirt with ${logo}`;
      console.log(`${color} shirt with ${logo}`);
    });

    // console.log('Zip')
    // zip(color$, logo$)
    // .subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));

    // console.log('combine latest')
    // combineLatest(color$, logo$)
    // .subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));

    // console.log('fork join')
    // forkJoin(color$, logo$)
    // .subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));
  }

  // debounceTime
  // This operator used to get all the values after the time frame (static time)
  onSearchDebTime() {
    console.log(this.inputDebounceTime);
    this.searchValue = 'typing...';
    this.searchSubject.next(this.inputDebounceTime);
    // debounce time
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  performSearch(searchValue: string) {
    // Perform the actual search operation here
    this.searchValue = searchValue;
    console.log('Performing search for:', searchValue);
    // ... Your search logic ...
  }

  // debounce
  // This operator used to get all the values after the time frame (dynamic time)
  onSearchDebounce() {
    let intervalTime = 300;
    this.debounceSearchVal = 'typing...';
    this.searchDebounceSubject.next(this.inputDebounce);
    // debounce time
    this.searchDebounceSubject
      .pipe(
        debounce((x) => {
          intervalTime += 100;
          return interval(intervalTime);
        })
      )
      .subscribe((val) => {
        this.performSearch1(val);
      });
  }

  performSearch1(val: string) {
    // Perform the actual search operation here
    this.debounceSearchVal = val;
    console.log('Performing search for:', val);
    // ... Your search logic ...
  }

  // takeLast operator
  // this operator takes element from last with the given limit
  takeLastOperator() {
    let sampleData = of(10, 2, 0, 12, 15, 3, 7, 8, 9);
    sampleData.pipe(takeLast(3)).subscribe((val) => {
      this.takeLastDataArr.push(val);
      console.log(val);
    });
  }

  // takeUntil operator
  // this operator takes element from last with the given limit
  takeUntilOperator() {
    console.log(this.takeUntil$);
    const sampleData = interval(1000);
    sampleData.pipe(takeUntil(this.takeUntil$)).subscribe((val) => {
      this.takeUntilData.push(val);
      console.log(val);
    });
  }

  stopTakeUntill() {
    console.log(this.takeUntil$);
    this.takeUntil$.next(true);
  }

  // iff operator
  iffOperator() {
    console.log(this.radioFlag)
    const firstOrSecond = iif(() => this.radioFlag,
      of('True is selected'),
      of('False is selected')
    );

    firstOrSecond.subscribe((value) => {
      this.iffOperatorData = value;
    });
  }

  //distinctUntilChanged operator
  distinctUntilChangedOptr(){
    const disUtlCgeOpr = of(1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,1,2);
    disUtlCgeOpr.pipe(distinctUntilChanged()).subscribe((val)=>{
      console.log(val);
      this.disUtlCgeOprArr.push(val)
    })
  }

  // partitionOperator
  // this operator helps to separate data based on category
  partitionOperator(){
    const partitionData = of(1,2,3,4,5)
    const [evens$, odds$] = partition(partitionData, value => value % 2 === 0);
    evens$.subscribe((evens) => {
      this.evensArr.push(evens)
      console.log(evens)
    })
    odds$.subscribe((odds) => {
      this.oddsArr.push(odds)
      console.log(odds)
    })

    const partitionDataArr = ["apple", 10, "banana", 20, "cherry"];
    const [strings$, numbers$] = partition(partitionDataArr, value =>  typeof value === "number");
    strings$.subscribe((strings) => {
      this.evensArr.push(strings)
      console.log(strings)
    })
    numbers$.subscribe((odds) => {
      this.oddsArr.push(odds)
      console.log(odds)
    })
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}
