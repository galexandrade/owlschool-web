export class Matter {
    matterName: string;

    _links: any;

    constructor(matterName?: string){
        this.matterName = matterName ? matterName : "";
    }
}