import { Voucher } from "./voucher.js";
import { referenceDocumentType, voucher } from "../../types";

export class Invoice extends Voucher {
  constructor(invoice: voucher) {
    super(invoice);
    this.rootTag = "FacturaElectronica";
    this.namespaces = {
      xmlns:
        "https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    };
    this.voucherType = referenceDocumentType.FacturaElectronica;
    if (invoice.sequence) {
      this.sequence = invoice.sequence;
    } else {
      this.generateSequence();
    }
    if (invoice.key) {
      this.key = invoice.key;
    } else {
      this.generateKey();
    }
  }
}
