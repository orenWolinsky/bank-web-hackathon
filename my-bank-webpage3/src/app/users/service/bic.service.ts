


export class BicService{
public bicBAXXICT:string = "BAXXICT";
public bicBAXTTTT:string = "BAXTTTT";
public bicOREN:string = "OREN";



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
}