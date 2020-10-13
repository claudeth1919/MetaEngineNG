import { SearchInterfaceEnum, OriginEnum } from './../service/common';

export class SearchedItem {
    public questionId: string;
    public title: string;
    public url: string;
    public link: string;
    public content: string;
    public displayLink: string;
    public searchInterfaceId: SearchInterfaceEnum;
    public originId: OriginEnum;
}
