import { summary, currency, generateSummary } from "../../../types";

export class Summary {
  constructor(summary: summary) {
    this.currency = summary.currency.CodigoMoneda
      ? summary.currency
      : { CodigoMoneda: "CRC", TipoCambio: 1 };
    this.servicesTaxableTotal = summary.servicesTaxableTotal
      ? summary.servicesTaxableTotal
      : 0;
    this.servicesExemptTotal = summary.servicesExemptTotal
      ? summary.servicesExemptTotal
      : 0;
    this.servicesExoneratedTotal = summary.servicesExoneratedTotal
      ? summary.servicesExoneratedTotal
      : 0;
    this.goodsTaxableTotal = summary.goodsTaxableTotal
      ? summary.goodsTaxableTotal
      : 0;
    this.goodsExemptTotal = summary.goodsExemptTotal
      ? summary.goodsExemptTotal
      : 0;
    this.goodsExoneratedTotal = summary.goodsExoneratedTotal
      ? summary.goodsExoneratedTotal
      : 0;
    this.taxableTotal = summary.taxableTotal
      ? summary.taxableTotal
      : this.servicesTaxableTotal + this.goodsTaxableTotal;
    this.ExemptTotal = summary.ExemptTotal
      ? summary.ExemptTotal
      : this.servicesExemptTotal + this.goodsExemptTotal;
    this.ExoneratedTotal = summary.ExoneratedTotal
      ? summary.ExoneratedTotal
      : this.servicesExoneratedTotal + this.goodsExoneratedTotal;
    this.subtotal = summary.subtotal
      ? summary.subtotal
      : this.taxableTotal + this.ExemptTotal + this.ExoneratedTotal;
    this.discountTotal = summary.discountTotal ? summary.discountTotal : 0;
    this.grossTotal = summary.grossTotal
      ? summary.grossTotal
      : this.subtotal - this.discountTotal;
    this.taxTotal = summary.taxTotal ? summary.taxTotal : 0;
    this.IVAReturned = summary.IVAReturned ? summary.IVAReturned : undefined;
    this.otherChargesTotal = summary.otherChargesTotal
      ? summary.otherChargesTotal
      : 0;
    this.netTotal = summary.netTotal
      ? summary.netTotal
      : this.grossTotal + this.taxTotal + this.otherChargesTotal;
  }

  currency: currency;
  servicesTaxableTotal: number;
  servicesExemptTotal: number;
  servicesExoneratedTotal: number;
  goodsTaxableTotal: number;
  goodsExemptTotal: number;
  goodsExoneratedTotal: number;
  taxableTotal: number;
  ExemptTotal: number;
  ExoneratedTotal: number;
  subtotal: number;
  discountTotal: number;
  grossTotal: number;
  taxTotal: number;
  IVAReturned?: number;
  otherChargesTotal: number;
  netTotal: number;

  generate() {
    const obj = {} as generateSummary;
    obj.CodigoTipoMoneda = { ...this.currency };
    obj.TotalServGravados = this.servicesTaxableTotal;
    obj.TotalServExemptos = this.servicesExemptTotal;
    obj.TotalServExonerado = this.servicesExoneratedTotal;
    obj.TotalMercanciasGravadas = this.goodsTaxableTotal;
    obj.TotalMercanciasExentos = this.goodsExemptTotal;
    obj.TotalMercExoneratedrada = this.goodsExoneratedTotal;
    obj.TotalGravado = this.taxableTotal;
    obj.TotalExempto = this.ExemptTotal;
    obj.TotalExonerado = this.ExoneratedTotal;
    obj.TotalVenta = this.subtotal;
    obj.TotalDescuentos = this.discountTotal;
    obj.TotalVentaNeta = this.grossTotal;
    obj.TotalImpuesto = this.taxTotal;
    if (this.IVAReturned) {
      obj.TotalIVADevuelto = this.IVAReturned;
    }
    obj.TotalOtrosCargos = this.otherChargesTotal;
    obj.TotalComprobante = this.netTotal;
    return obj;
  }
}
