import { Subject } from "rxjs";

export class DialogRef {
    constructor() {}
  
    close(result?: any) {
      this.afterClosed?.next(result);
    }
  
    public readonly afterClosed = new Subject<any>();
  }