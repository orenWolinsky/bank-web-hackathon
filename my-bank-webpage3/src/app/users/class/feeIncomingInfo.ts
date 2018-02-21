export class FeeIncomingInfo{

    public productFee:number = 0;
    public productCableFee:number = 0;
    public productInternationalFee:number = 0;
    public productTaxFee:number = 0;

    //immediate
    public totalImmidiateFee():number{
        return this.immidiateCableFee + this.immidiateInternationalFee + this.immidiateTaxFee;
    }
    public immidiateFee:number=0;
    public immidiateCableFee:number=0;
    public immidiateInternationalFee:number=0;
    public immidiateTaxFee:number=0;
    
    //urgent
    public totalUrgenteFee():number{
        return this.urgentCableFee + this.urgentInternationalFee + this.urgentTaxFee;
    }
    public urgentFee:number=0;
    public urgentCableFee:number=0;
    public urgentInternationalFee:number = 0;
    public urgentTaxFee:number=0;

    //non urgent
    public totalNonUrgentFee():number{
        return this.nonUrgentCableFee + this.nonUrgentInternationalFee + this.nonUrgentTaxFee;
    }
    public nonUrgentFee:number=0;
    public nonUrgentCableFee:number=0;
    public nonUrgentInternationalFee:number = 0;
    public nonUrgentTaxFee:number=0;

}