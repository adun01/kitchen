export class KtnProductModel {
    public id: number;
    public name: string;
    public count: number;
    public unitOfMeasure: string;
    public iconType: number;
    public contains: {
        protein: number,
        carbohydrates: number,
        fat: number,
    };

    constructor(raw: any) {
        this.id = raw.id;
        this.name = raw.name;
        this.count = raw.count;
        this.unitOfMeasure = raw.unitOfMeasure;
        this.iconType = raw.iconType;
        this.contains = {
            protein: raw.contains.protein,
            carbohydrates: raw.contains.carbohydrates,
            fat: raw.contains.fat,
        };
    }
}
