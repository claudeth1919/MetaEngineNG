
export class Answer {
    public id: string;
    public elementId: string;
    public body: string;
    public bodyWithourHTML:string;
    public points: number;
    public bodyLength: number;
    public isBestAnswered: number;
    public publicationDate: number;
    public userScore: number;
    public questionId: string;

    get isTheBest() { return this.isBestAnswered != 0; }
}
