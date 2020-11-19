import {
  generateReference,
  reference,
  referenceCode,
  referenceDocumentType
} from "../../../types";

export class Reference {
  constructor(reference: reference) {
    this.documentType = reference.documentType;
    if (this.number)
      if (reference.number?.length === 50) this.number = reference.number;
      else throw new Error("reference number must be 50 characters in length");
    this.date = reference.date;
    if (this.code) this.code = reference.code;
    if (reference.reason)
      if (reference.reason.length <= 180) this.reason = reference.reason;
      else
        throw new Error("reference reason must be <= 180 characters in length");
  }

  documentType: referenceDocumentType;
  number?: string;
  date: string;
  code?: referenceCode;
  reason?: string;

  generate() {
    const obj = {} as generateReference;
    obj.TipoDoc = this.documentType;
    if (this.number) obj.Numero = this.number;
    obj.FechaEmision = this.date;
    if (this.code) obj.Codigo = this.code;
    if (this.reason) obj.Razon = this.reason;
    return obj;
  }
}
