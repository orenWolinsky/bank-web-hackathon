


export class BicService{
    
    public bicCountryMap:Map<string,string> = new Map<string,string>();
    public bicMap:Map<string,string> = new Map<string,string>();
    public bicNames:Map<string,string> = new Map<string,string>();

    constructor(){
        this.bicCountryMap.set("fr","FRANCE");
        this.bicCountryMap.set("FR","FRANCE");
        this.bicCountryMap.set("IS","ISRAEL");

        this.bicMap.set("MRM","MRMDUS33XXX");
        this.bicMap.set("HSBC","HSBCHKHHXXX");
        this.bicMap.set("CITI","CITIUS33XXX");
        this.bicMap.set("BNP","BNPAFRPPXXX");
        this.bicMap.set("BAR","BARCGB22XXX");
        this.bicMap.set("WPA","WPACAU2SXXX");
        this.bicMap.set("BKC","BKCHCNBJ110");

        this.bicNames.set("MRMDUS33XXX","HSBC BANK USA");
        this.bicNames.set("HSBCHKHHXXX","HSBC HONGKONG AND SHANGHAI");
        this.bicNames.set("CITIUS33XXX","CITI BANK USA");
        this.bicNames.set("BNPAFRPPXXX","BNP PARIBAS PARIS");
        this.bicNames.set("BARCGB22XXX","BARCLAYS LONDON");
        this.bicNames.set("WPACAU2SXXX","WESTPAC SYDNEY");
        this.bicNames.set("BKCHCNBJ110","BANK OF CHINA BEIJING");
    }

    public autoComplete(input:string):string{
            
            let value = this.bicMap.get(input);
            if(value !== undefined){
                return value;
            }
            return input;
    }

    public nameComplete(input:string):string{
        return this.bicNames.get(input);
    }

    public retriveCountryFromBic(bic:string):string{
        let subcountry:string = bic.substring(4,6);
        let country:string = this.bicCountryMap.get(subcountry);
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