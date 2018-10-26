export class Filter<T> {
    numberOfResult:  number;
    obj: T;
    
    constructor(numberOfResult: number, obj: T) {
        this.numberOfResult = numberOfResult;
        this.obj = obj;
    }
}