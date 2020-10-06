import { Answer } from './answers.entity';
import { Tag } from './tag.entity';
import { Origin } from './origin.entity';

export class Question {
  public id :string;
  public origin: Origin;
  public originId :string;
  public elementId: string;
  public answerCount: number;
  public title: string;
  public url: string;
  public body: string;
  public points: number;
  public bodyLength: number;
  public isAnswered: boolean;
  public publicationDate: number;
  public answers: Array<Answer>;
  public tags: Array<Tag>;
}
