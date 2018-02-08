


export class BicService{
public bicBAXXICT:string = "BAXXICT";
public bicBAXTTTT:string = "BAXTTTT";
public bicTBNFFR43PAR:string = "TBNFFR43PAR";
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

public retriveCountryFromBic(bic:string):string{
    let country:string = bic.substring(4,6);

    console.log(country);

    return country;
}
}