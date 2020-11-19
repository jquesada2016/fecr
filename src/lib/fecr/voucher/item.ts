import {
  item,
  generateItem,
  discount,
  unidadMedida,
  tax
} from "../../../types";
import { commercialCode } from "../../../types/types";

export class Item {
  constructor(item: item) {
    this.number = item.number;
    if (item.hsCode) {
      if (item.hsCode.length === 13) this.hsCode = item.hsCode;
      else throw new Error("hsCode must be 13 characters in length");
    }
    this.hsCode = item.hsCode;

    if (item.commercialCode) {
      if (item.commercialCode.length <= 5)
        this.commercialCode = item.commercialCode;
      else throw new Error("commercialCode must be <= 5 items");
      item.commercialCode.map((item, i) => {
        if (item.Codigo!.length > 20)
          throw new Error(
            `commercialCode Codigo at index ${i} must be <= 20 characters in length`
          );
      });
    }
    this.quantity = item.quantity;
    this.units = item.units;
    if (item.commercialUnits) {
      if (item.commercialUnits.length <= 20)
        this.commercialUnits = item.commercialUnits;
      else
        throw new Error("commercialUnits must be <= 20 characters in length");
    }
    if (item.detail.length <= 200) this.detail = item.detail;
    else throw new Error("detail must be <= 200 characters in length");
    this.unitPrice = item.unitPrice;
    this.total = item.total;
    if (item.discount) {
      if (item.discount.length <= 5) {
        item.discount.map((item, i) => {
          if (item.NaturalezaDescuento.length > 80)
            throw new Error(
              `discount NaturalezaDescuento on index ${i} must be <= 80 characters in length`
            );
        });
        this.discount = item.discount;
      } else throw new Error("discount must be <= 5 items in length");
    }
    this.subtotal = item.subtotal;
    if (item.taxBase) {
      this.taxBase = item.taxBase;
    }
    if (item.taxes) {
      item.taxes.map((item, i) => {
        if (item.Exoneracion.NombreInstitucion.length > 160)
          throw new Error(
            `NombreInstitucional on index ${i} must be <= 160 characters in length`
          );
      });
      this.taxes = item.taxes;
    }
    this.taxNet = item.taxNet ? item.taxNet : 0;
    this.netTotal = item.netTotal;
  }

  number: number;
  hsCode: string;
  commercialCode?: commercialCode;
  quantity: number;
  units: unidadMedida;
  commercialUnits?: string;
  detail: string;
  unitPrice: number;
  total: number;
  discount?: discount;
  subtotal: number;
  taxBase: number;
  taxes: tax;
  taxNet?: number;
  netTotal: number;

  generate() {
    const obj = {} as generateItem;
    obj.NumeroLinea = this.number;
    obj.Codigo = this.hsCode;
    if (this.commercialCode) {
      obj.CodigoComercial = [...this.commercialCode];
    }
    obj.Cantidad = this.quantity;
    obj.UnidadMedida = this.units;
    obj.Detalle = this.detail;
    obj.PrecioUnitario = this.unitPrice;
    obj.MontoTotal = this.total;
    if (this.discount) {
      obj.Descuento = [...this.discount];
    }
    obj.SubTotal = this.subtotal;
    obj.BaseImponible = this.taxBase;
    if (this.taxes) {
      obj.Impuesto = [...this.taxes];
    }
    obj.ImpuestoNeto = this.taxNet!;
    obj.MontoTotalLinea = this.netTotal;

    return obj;
  }
}
