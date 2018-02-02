
export interface ITask {
    agent: string;
    account: string;
    amount:number;
}

export class TransferInfo {

    public agent: string = "";
    public account: string = "";
    public amount:number = 0;

    constructor(private agt:string,private acc:string,private amt:number) {
        this.agent = agt;
        this.account = acc;
        this.amount = amt;
    }

}