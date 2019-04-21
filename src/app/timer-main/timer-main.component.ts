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

  /*
  * 重置倒數計時器
  * @param o: HeroTimerComponent
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
    this.countDownNumber = this.initSession(this.sessionName, this.countDownNumber);
    this.setLocalSession(this.sessionName, this.countDownNumber.toString());
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
    const yearStr = this.padLeft(date.getFullYear(), 4);
    const monthStr = this.padLeft(date.getMonth(), 2);
    const dayStr = this.padLeft(date.getDay(), 2);
    const hourStr = this.padLeft(date.getHours(), 2);
    const minsStr = this.padLeft(date.getMinutes(), 2);
    const secondStr = this.padLeft(date.getSeconds(), 2);
    const dateStr = `${hourStr}:${minsStr}:${secondStr}`;
    return dateStr;
  }

  main() {
    this.clock = this.getDate();
    this.countDownNumber--;
    if (this.countDownNumber < 0) {
      setTimeout(() => {
        clearInterval(this.clockTimer);
        console.log('Close Interval:', this.clockTimer);
      }, 500);
    } else {
      this.setLocalSession(this.sessionName, this.countDownNumber.toString());
      this.countDownClock = this.getCountDownClock(this.countDownNumber);
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...', this.defaultValue);
    localStorage.removeItem(this.sessionName);
    this.setLocalSession('defaultValue', this.defaultValue.toString());
    this.reset(this);
  }

  @HostListener('document:click', ['$event']) private onClick(event: any) {
    console.log('click');
    this.reset(this);
  }
  @HostListener('document:keypress', ['$event']) private onKeypress(event: any) {
    console.log('keypress');
    this.reset(this);
  }
  @HostListener('document:mouseover', ['$event']) private onMouseover(event: any) {
    console.log('mouseover');
    this.reset(this);
  }
  @HostListener('document:scroll', ['$event']) private onScroll(event: any) {
    console.log('Scroll');
    this.reset(this);
  }
}
