import {
  generateReference,
  reference,
  referenceCode,
  referenceDocumentType
} from "../../../types";

export class Reference {
  constructor(reference: reference) {
    this.documentType = reference.documentType;
    this.number = reference.number;
    this.date = reference.date;
    this.code = reference.code;
    this.reason = reference.reason;
  }

  documentType: referenceDocumentType;
  number?: string;
  date: string;
  code?: referenceCode;
  reason?: string;

  generate() {
    const obj = {} as generateReference;
    obj.TipoDoc = this.documentType;
    obj.Numero = this.number;
    obj.FechaEmision = this.date;
    obj.Codigo = this.code;
    obj.Razon = this.reason;
    return obj;
  }
}
