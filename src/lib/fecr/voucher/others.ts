import { others, generateOthers } from "../../../types";

export class Others {
  constructor(others: others) {
    this.text = others.text;
  }

  text: string;

  generate() {
    const obj = {} as generateOthers;
    obj.OtroTexto = this.text;
    return obj;
  }
}
