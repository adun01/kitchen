export class KtnStepModel {
    public id: number;
    public description: string;
    public image: string;

    constructor(raw: any) {
        this.id = raw.id;
        this.description = raw.description;
        this.image = raw.image;
    }
}
