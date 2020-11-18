import {
  item,
  generateItem,
  discount,
  unidadMedida,
  commercialCodeType,
  tax
} from "../../../types";

export class Item {
  constructor(item: item) {
    this.number = item.number;
    if (item.hsCode) {
      this.hsCode = item.hsCode;
    }
    this.hsCode = item.hsCode;

    if (item.commercialCode) {
      this.typeCommercialCode = item.commercialCode.Tipo;
      this.commercialCode = item.commercialCode.Codigo;
    }
    this.quantity = item.quantity;
    this.units = item.units;
    if (item.commercialUnits) {
      this.commercialUnits = item.commercialUnits;
    }
    this.description = item.detail;
    this.unitPrice = item.unitPrice;
    this.total = item.total;
    if (item.discount) {
      this.discount = item.discount;
    }
    this.subtotal = item.subtotal;
    if (item.taxBase) {
      this.taxBase = item.taxBase;
    }
    if (item.taxes) {
      this.taxes = item.taxes;
    }
    this.taxNet = item.taxNet ? item.taxNet : 0;
    this.netTotal = item.netTotal;
  }

  number: number;
  hsCode: string;
  typeCommercialCode?: commercialCodeType;
  commercialCode?: string;
  quantity: number;
  units: unidadMedida;
  commercialUnits?: string;
  description: string;
  unitPrice: number;
  total: number;
  discount?: discount;
  subtotal: number;
  taxBase: number;
  taxes: tax[];
  taxNet?: number;
  netTotal: number;

  generate() {
    const obj = {} as generateItem;
    obj.NumeroLinea = this.number;
    if (this.hsCode) {
      obj.Codigo = this.hsCode;
    }
    if (this.commercialCode && this.typeCommercialCode) {
      obj.CodigoComercial = {
        Tipo: this.typeCommercialCode,
        Codigo: this.commercialCode
      };
    }
    obj.Cantidad = this.quantity;
    obj.UnidadMedida = this.units;
    obj.Detalle = this.description;
    obj.PrecioUnitario = this.unitPrice;
    obj.MontoTotal = this.total;
    if (this.discount) {
      obj.Descuento = this.discount;
    }
    obj.SubTotal = this.subtotal;
    obj.BaseImponible = this.taxBase;
    if (this.taxes) {
      const iva: any = [];
      this.taxes.forEach((tax: any) => {
        iva.push(tax.generate());
      });
      obj.Impuesto = iva;
    }
    obj.ImpuestoNeto = this.taxNet!;
    obj.MontoTotalLinea = this.netTotal;

    return obj;
  }
}
