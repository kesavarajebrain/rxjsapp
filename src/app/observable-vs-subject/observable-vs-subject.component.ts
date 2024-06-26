import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  interval,
} from 'rxjs';

@Component({
  selector: 'app-observable-vs-subject',
  templateUrl: './observable-vs-subject.component.html',
  styleUrl: './observable-vs-subject.component.css',
})
export class ObservableVsSubjectComponent implements OnInit {
  observableRandomArr: any[] = [];
  subjectRandomArr: any[] = [];
  behaviourSubjectRandomArr: any[] = [];
  replaySubjectRandomArr: any[] = [];
  asyncSubjectRandomArr: any[] = [];
  counterObservable: any[] = [];

  subscriberOne: any;
  ngOnInit(): void {
    // observable
    const myObservable = new Observable((observer) => {
      // generate random values
      observer.next(Math.random());
    });

    // subscribe those values multiple times - every console log we receive random values
    myObservable.subscribe((data) => {
      this.observableRandomArr.push(data);
      console.log(data);
    });

    myObservable.subscribe((data) => {
      this.observableRandomArr.push(data);
      console.log(data);
    });

    // here we added settimout also
    setTimeout(() => {
      myObservable.subscribe((data) => {
        this.observableRandomArr.push(data);
        console.log(data);
      });
    }, 1000);

    // subject
    const mySubject = new Subject();
    // subscribe those values multiple times - every console log we unique random values
    mySubject.subscribe((data) => {
      this.subjectRandomArr.push(data);
      console.log(data);
    });

    mySubject.subscribe((data) => {
      this.subjectRandomArr.push(data);
      console.log(data);
    });

    mySubject.subscribe((data) => {
      this.subjectRandomArr.push(data);
      console.log(data);
    });

    // add set timeout - its not print
    setTimeout(() => {
      mySubject.subscribe((data) => {
        this.subjectRandomArr.push(data);
        console.log(data);
      });
    }, 2000);
    // generate random values
    mySubject.next(Math.random());

    // behavioursubject
    const myBehavioursubject = new BehaviorSubject<any>(100);
    // initial value is 100 after the next method again it called but now updated value as 200 so its display
    // subscribe bs
    myBehavioursubject.subscribe((data) => {
      this.behaviourSubjectRandomArr.push(
        'BehaviorSubject Subscriber 1 -> ' + data
      );
      console.log('BehaviorSubject Subscriber 1-> ' + data);
    });

    myBehavioursubject.subscribe((data) => {
      this.behaviourSubjectRandomArr.push(
        'BehaviorSubject Subscriber 2 -> ' + data
      );
      console.log('BehaviorSubject Subscriber 2 -> ' + data);
    });

    myBehavioursubject.next(200); // next means where ever we subscribed those its update new value

    myBehavioursubject.subscribe((data) => {
      this.behaviourSubjectRandomArr.push(
        'BehaviorSubject Subscriber 3 -> ' + data
      );
      console.log('BehaviorSubject Subscriber 3-> ' + data);
    });

    // 100, 100 , 200 ,200,200 - initially 100 is for sub 1, sub2 , after next we emit 200 so sub3 have new value after that sub1,2 receive new value

    // replay subject
    // initial value optional
    // when using replay subject -> all the subscribers receive old emitted value and new values
    const myReplaySubject = new ReplaySubject<any>();
    myReplaySubject.next(100);

    myReplaySubject.subscribe((data) => {
      console.log(data);
      this.replaySubjectRandomArr.push('Replay Subscriber 1 -> ' + data);
    });

    myReplaySubject.subscribe((data) => {
      console.log(data);
      this.replaySubjectRandomArr.push('Replay Subscriber 2 -> ' + data);
    });

    myReplaySubject.next(200);

    myReplaySubject.subscribe((data) => {
      console.log(data);
      this.replaySubjectRandomArr.push('Replay Subscriber 3 -> ' + data);
    });

    // 100,100,200,200,100,200 - here sub1,2 receive 100 after emit 200 sub1,2 receive 200 then sub3 receive both 100 and 200

    // async subject
    const myAsyncSubject = new AsyncSubject<any>();

    myAsyncSubject.next('A');
    myAsyncSubject.next('B');
    myAsyncSubject.next('C');

    myAsyncSubject.complete(); // MUST it complete
    // async subject only returns last emitted value after that complete method only , if not complete method it wont able to subscribe the data
    myAsyncSubject.subscribe((data) => {
      console.log('Async Subject -> 1 ' + data);
      this.asyncSubjectRandomArr.push('Async Subject 1 -> ' + data);
    });

    myAsyncSubject.next('D'); // it wont emit because it already complete method happened

    myAsyncSubject.subscribe((data) => {
      console.log('Async Subject -> 2 ' + data);
      this.asyncSubjectRandomArr.push('Async Subject 2 -> ' + data);
    });

    // promise vs observable

    // Promise
    // Native js code
    // Called eager
    const myPromise = new Promise((resolve, reject) => {
      console.log('Promise called eager');
      resolve(100);
      resolve(200); // emits only single value
      resolve(300); // emits only single value
      reject('Error Occured');
    });

    // access promise
    myPromise
      .then((data) => {
        console.log('Promise Data => ' + data); // get data if in resolve state
      })
      .catch((err) => {
        console.log(err); // get error if in reject state
      });

    // observable
    // from Rxjs
    // called lazy

    const myNewObservable = new Observable((observer) => {
      console.log('Observable called when its subscribed');
      observer.next(10); // emits multiple values
      observer.next(20); // emits multiple values
      observer.next(30); // emits multiple values
      observer.complete();
      observer.error('Error occured ');
    });

    // access observable
    myNewObservable.subscribe({
      next(x) {
        console.log('Observable Data=> ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }

  // unsubscribe
  counter = interval(1000); // its rxjs interval its also a observable - gives data every 1sec

  // access counter observable
  subscribe() {
    this.subscriberOne = this.counter.subscribe((data) => {
      this.counterObservable.push(data);
      console.log("Subcribed!");
      console.log('counter data => ' + data);
    });
  }

  unSubscribe() {
    console.log("Unsubcribed!");
    this.subscriberOne.unsubscribe();
  }
}
