import { makeAutoObservable } from 'mobx';

export class CalendarStore {
  range: number = 7;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setRange = (range: number) => {
    this.range = range;
    this.endDate = new Date(this.startDate.getTime() + this.range * 24 * 60 * 60 * 1000);
  };
  getRange = () => {
    return this.range;
  };
  getStartDate = () => {
    return this.startDate;
  };
  getEndDate = () => {
    return this.endDate;
  };
}
