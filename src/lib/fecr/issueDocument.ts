// import xml2js from "xml2js";
import { Api } from "./api";
import { issueDocument, saleCondition, voucher } from "../../types";
import { Invoice } from "./invoice";
import { Issuer } from "./voucher/issuer";
import { Item } from "./voucher/item";
// import { Others } from "./voucher/others";
import { Receiver } from "./voucher/receiver";
import { Reference } from "./voucher/reference";
// import { Summary } from "./voucher/summary";
import { zfill } from "./utils";

export function issueVoucher(voucher: issueDocument) {
  return new Promise(async (resolve, reject) => {
    const items: Item[] = [];
    voucher.items.map((item) => items.push(new Item(item)));

    const voucherData = {} as voucher;

    voucherData.items = items;
    voucherData.activityCode = voucher.activityCode;
    voucherData.api = new Api(voucher.api);
    voucherData.cert = voucher.cert;
    voucherData.saleCondition = voucher.saleCondition;
    if (voucher.creditTerm === saleCondition.Credito)
      voucherData.creditTerm = voucher.creditTerm;
    voucherData.headquarters = voucher.headquarters;
    voucherData.terminal = voucher.terminal;
    voucherData.documentNumber = voucher.documentNumber;
    voucherData.paymentType = voucher.paymentType;
    voucherData.issuer = new Issuer(voucher.issuer);
    voucherData.receiver = new Receiver(voucher.receiver);
    if (voucher.references?.length) {
      const references: Reference[] = [];
      voucher.references.map((reference) =>
        references.push(new Reference(reference)),
      );
      voucherData.references = references;
    }
    voucherData.securityCode = voucher.securityCode
      ? voucher.securityCode
      : zfill(Math.floor(Math.random() * 100_000_000), 8);
    voucherData.situation = voucher.situation;

    const invoice = new Invoice(voucherData);

    try {
      const res = await invoice.send();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}
