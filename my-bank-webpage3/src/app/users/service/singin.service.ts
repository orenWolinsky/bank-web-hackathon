

export class SinginService{

    private str:string = "";
    //private listOfNames
    public obj:Map<string,string> = new Map<string,string>();

    constructor(){
        this.obj.set("orenwol","dd");
        this.obj.set("eyalrg","abc123");
        this.obj.set("admin15","abc123");
    }
    public validateSign(user:string,pass:string):boolean{

        let password = this.obj.get(user);
    
        if(password === pass){
            return true;
        }

        return false;
    }
    
}