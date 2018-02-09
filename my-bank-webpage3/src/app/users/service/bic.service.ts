


export class BicService{
    public bicBAXXICT:string = "BAXXICT";
    public bicBAXTTTT:string = "BAXTTTT";
    public bicTBNFFR43PAR:string = "TBNFFR43PAR";
    public bicOREN:string = "OREN";
    public obj:Map<string,string> = new Map<string,string>();

    constructor(){
        this.obj.set("fr","FRANCE");
        this.obj.set("FR","FRANCE");
        this.obj.set("IS","ISRAEL");
    }

    public autoComplete(input:string):string{
            
            if(input === "BAX"){
                return "BAXXICT";
            }

            if(input === "BAT"){
                return "BAXTTTT";
            }
            
            if(input === "OR"){
                return "OREN WOLINSKY";
            }

            return input;
        }

    public retriveCountryFromBic(bic:string):string{
        let subcountry:string = bic.substring(4,6);
        let country:string = this.obj.get(subcountry);
        return country;
    }

    public isBicValid(bic:string):boolean{

        if(bic.length < 8 || bic.length > 11){
            return false;
        }
        else{
            return true;
        }
    }

}