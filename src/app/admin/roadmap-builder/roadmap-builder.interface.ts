declare var moment;

export interface RoadmapItemInterface {
    title : string;
    description: string;
    date : any;
    exchangeRate? : number;
    minTokenToBuy?: number;
    bonus?: number;
    includeFeatureYears?: boolean;
}


export class RoadmapItem {
    title : string;
    description : string;
    date : string;
    exchangeRate : number;
    minTokenToBuy : number;
    bonus : number;
    includeFeatureYears : boolean;

    constructor(title: string,
                description: string,
                date?: string,
                exchangeRate?: number,
                minTokenToBuy? : number,
                bonus? : number,
                includeFeatureYears? : boolean) {
        this.title = title || '';
        this.date = date || moment().format('MMMM YYYY');
        this.description = description || '';
        this.exchangeRate = exchangeRate || null;
        this.minTokenToBuy = minTokenToBuy || null;
        this.bonus = bonus || null;
        this.includeFeatureYears = includeFeatureYears;
    }
}
