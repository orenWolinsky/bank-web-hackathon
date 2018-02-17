

export class SinginService{

    private str:string = "";
    //private listOfNames
    public obj:Map<string,string> = new Map<string,string>();

    constructor(){
        this.obj.set("orenw","dd");
        this.obj.set("eyalr","abc123");
        this.obj.set("zachik","abc123");
        this.obj.set("idano","abc123");
    }
    public validateSign(user:string,pass:string):boolean{

        let password = this.obj.get(user);
    
        if(password === pass){
            return true;
        }

        return false;
    }
    
}