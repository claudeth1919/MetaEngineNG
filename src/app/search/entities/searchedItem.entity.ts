import { SearchInterfaceEnum, OriginEnum } from './../service/common';
import { Question } from './question.entity';

export class SearchedItem {
    public questionElementId: string;
    public question: Question;
    public title: string;
    public url: string;
    public link: string;
    public content: string;
    public displayLink: string;
    public searchInterfaceId: SearchInterfaceEnum;
    public originId: OriginEnum;
}
