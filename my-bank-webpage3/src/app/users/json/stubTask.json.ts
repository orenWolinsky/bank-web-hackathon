
export interface ITask {
    agent: string;
    account: string;
    amount:number;
}

export class Stub {

    constructor(public id:string,public title:string,public description:string,public group:string) {
        
    }

}