import { DiagnoserContext } from "../Types/Context/DiagnoserContext";

export class Diagnoser {
  readonly context: DiagnoserContext;

  constructor(context: DiagnoserContext) {
    this.context = context;
  }
}
