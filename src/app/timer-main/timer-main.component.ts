import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-timer-main',
  templateUrl: './timer-main.component.html',
  styleUrls: ['./timer-main.component.css']
})

export class TimerMainComponent {
  defaultValue = 1 * 60 * 20;
  stopTimeValue = this.defaultValue * 1000 + 500;
  intervalTime = 1000;
  countDownNumber = this.defaultValue;
  clockTimer: any;
  countDownClock = '';
  sessionName = 'timer';
  clock = '';
  handleEvents = ['click', 'mousemove', 'mouseover', 'mouseout', 'keyup', 'keydown', 'keypress', 'scroll'];
  /*
  * 重置倒數計時器
  * @param o: TimerMainComponent
  * Todos :
  **/
  reset = (o: TimerMainComponent): void => {
    o.countDownNumber = o.defaultValue;
  }
  padLeft = (num: number, size: number): string => {
    let s = num.toString() + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
  constructor() {
    this.onEvent(this.handleEvents);
    this.countDownNumber = this.initSession(this.sessionName, this.countDownNumber);
    this.setLocalSession(this.sessionName, this.countDownNumber.toString());

    setInterval(() => { this.clock = this.getDate(); }, this.intervalTime);

    this.clockTimer = setInterval(() => {
      this.main();
    }, this.intervalTime);
  }
  getCountDownClock(value: number) {
    const mins = Math.floor(value / 60);
    const seconds = value - (mins * 60);
    const minsStr = this.padLeft(mins, 2);
    const secStr = this.padLeft(seconds, 2);
    return `${minsStr}:${secStr}`;
  }
  initSession(name: string, value: number) {
    const storeNumber = +this.getLocalSession(name);
    const initState = !localStorage.hasOwnProperty(name) || isNaN(storeNumber);
    const retuNumber = initState ? value : storeNumber;
    console.log('init ->', retuNumber);
    // console.log(Object.getOwnPropertyNames(HeroTimerComponent.prototype));
    return retuNumber;
  }
  setLocalSession(name: string = '', value: string) {
    localStorage.setItem(name, value);
  }

  getLocalSession(name: string) {
    return localStorage.getItem(name);
  }

  getDate(date: Date = null) {
    date = date === null ? new Date() : date;
    // const yearStr = this.padLeft(date.getFullYear(), 4);
    // const monthStr = this.padLeft(date.getMonth(), 2);
    // const dayStr = this.padLeft(date.getDay(), 2);
    const hourStr = this.padLeft(date.getHours(), 2);
    const minsStr = this.padLeft(date.getMinutes(), 2);
    const secondStr = this.padLeft(date.getSeconds(), 2);
    const dateStr = `${hourStr}:${minsStr}:${secondStr}`;
    return dateStr;
  }

  main() {
    this.countDownNumber--;
    if (this.countDownNumber < 0) {
      setTimeout(() => {
        clearInterval(this.clockTimer);
        this.offEvent(this.handleEvents);
        console.log('Close Interval:', this.clockTimer);
      }, 500);
    } else {
      this.setLocalSession(this.sessionName, this.countDownNumber.toString());
      this.countDownClock = this.getCountDownClock(this.countDownNumber);
    }
  }
  onEvent(events: string[]) {
    const target = document.body;
    for (const e of events) {
      target.addEventListener(e, () => {
        this.reset(this);
      });
    }
  }
  offEvent(events: string[]) {
    const target = document.body;
    for (const e of events) {
      target.removeEventListener(e, () => {});
    }
  }
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {}
}
