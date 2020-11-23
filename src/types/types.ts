/* ==============================================================================
                              Class Input Types
   ============================================================================== */

import { Api } from "../lib/fecr/api";
import { Issuer } from "../lib/fecr/voucher/issuer";
import { Item } from "../lib/fecr/voucher/item";
import { Others } from "../lib/fecr/voucher/others";
import { Receiver } from "../lib/fecr/voucher/receiver";
import { Reference } from "../lib/fecr/voucher/reference";
import { Summary } from "../lib/fecr/voucher/summary";

/** @todo: need to cross verify with XSD document to guarantee the validity fields*/
export type apiType = {
  user: string;
  pass: string;
  environment: "stag" | "prod";
  token?: string;
  refresh?: string;
  expires?: number;
  refreshExpires?: number;
};

export type issuer = {
  name: string;
  idType: string;
  id: idType;
  commercialName?: string;
  location: location;
  phone?: phoneNumber;
  fax?: phoneNumber;
  email: string;
};

export type item = {
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
  taxBase?: number;
  taxes?: tax;
  taxNet?: number;
  netTotal: number;
};

export type others = {
  text: string[];
};

export type receiver = {
  name: string;
  idType: string;
  id: idType;
  foreignId?: string;
  comercialName?: string;
  location?: location;
  foreignOthers?: string;
  phone?: phoneNumber;
  fax?: phoneNumber;
  email?: string;
};

export type reference = {
  documentType: referenceDocumentType;
  number?: string;
  date: string;
  code?: referenceCode;
  reason?: string;
};

export type voucher = {
  cert: cert;
  api: typeof Api;
  date: string;
  issuer: typeof Issuer;
  headquarters: number;
  terminal: number;
  number: number;
  situation: documentSituation;
  activityCode: string;
  securityCode: string;
  receiver: typeof Receiver;
  condition: saleCondition;
  paymentType: paymentType[];
  creditTerm?: string;
  items?: typeof Item[];
  otherCharges?: otherCharges;
  summary: typeof Summary;
  references?: typeof Reference;
  others?: typeof Others;
};

/** @todo Need to check fields to make sure the constructor aligns with documentation */
export type summary = {
  currency: currency;
  servicesTaxableTotal?: number;
  servicesExemptTotal?: number;
  servicesExoneratedTotal?: number;
  goodsTaxableTotal?: number;
  goodsExemptTotal?: number;
  goodsExoneratedTotal?: number;
  taxableTotal?: number;
  ExemptTotal?: number;
  ExoneratedTotal?: number;
  subtotal: number;
  discountTotal?: number;
  grossTotal: number;
  taxTotal?: number;
  IVAReturned?: number;
  otherChargesTotal?: number;
  netTotal: number;
};

/* ==============================================================================
                                      Class Return Types
   ============================================================================== */

export type generateIssuer = {
  Nombre: string;
  Identificacion: id;
  NombreComercial?: string;
  Ubicacion: location;
  Telefono?: phoneNumber;
  Fax?: phoneNumber;
  CorreoElectronico: string;
};

export type generateItem = {
  NumeroLinea: number;
  Codigo: string;
  CodigoComercial?: commercialCode;
  Cantidad: number;
  UnidadMedida: unidadMedida;
  UnidadMedidaComercial?: string;
  Detalle: string;
  PrecioUnitario: number;
  MontoTotal: number;
  Descuento?: discount;
  SubTotal: number;
  BaseImponible: number;
  Impuesto: tax;
  ImpuestoNeto?: number;
  MontoTotalLinea: number;
};

export type generateOthers = {
  OtroTexto: string[];
};

export type generateReceiver = {
  Nombre: string;
  Identificacion: id;
  IdentificacionExtranjero?: string;
  NombreComercial?: string;
  Ubicacion?: location;
  OtrasSenasExtranjero?: string;
  Telefono?: phoneNumber;
  Fax?: phoneNumber;
  CorreoElectronico?: string;
};

export type generateReference = {
  TipoDoc: referenceDocumentType;
  Numero?: string;
  FechaEmision: string;
  Codigo?: referenceCode;
  Razon?: string;
};

export type generateSummary = {
  CodigoTipoMoneda?: currency;
  TotalServGravados: number;
  TotalServExemptos: number;
  TotalServExonerado: number;
  TotalMercanciasGravadas: number;
  TotalMercanciasExentos: number;
  TotalMercExoneratedrada: number;
  TotalGravado: number;
  TotalExempto: number;
  TotalExonerado: number;
  TotalVenta: number;
  TotalDescuentos: number;
  TotalVentaNeta: number;
  TotalImpuesto: number;
  TotalIVADevuelto?: number;
  TotalOtrosCargos: number;
  TotalComprobante: number;
};

/* ==============================================================================
                                      Data Types
   ============================================================================== */

export type location = {
  Provincia: number;
  Canton: number;
  Distrito: number;
  Barrio?: number;
  OtrasSenas: string;
};
export type phoneNumber = { CodigoPais: "506"; NumTelefono: string };
export type id = { Tipo: idType; Numero: string };
export type commercialCode = { Tipo: commercialCodeType; Codigo?: string }[];
export type discount = {
  MontoDescuento: number;
  NaturalezaDescuento: string;
}[];
export type tax = {
  Codigo: taxCode;
  CodigoTarifa: taxCodeRate;
  Tarifa: taxRatePercentage;
  FactorIVA: number;
  Monto: number;
  Exoneracion: exoneration;
}[];
export type taxRatePercentage = 0 | 0.01 | 0.02 | 0.04 | 0.08 | 0.13;
export type exoneration = {
  TipoDocumento: ExoneratedrationdocumentType;
  NumeroDocumento: string;
  NombreInstitucion: string;
  FechaEmision: string;
  PorcentajeExoneratedracion: number;
  MontoExoneratedracion: number;
};
export type currency = {
  CodigoMoneda: currencyCode;
  TipoCambio: number;
};
export type pem = {
  key: string;
  chain: string;
};
export type keyPair = {
  key: string;
  x509: string;
};
export type p12 = {
  path: string;
  pass: string;
};
export type cert = {
  keyPair: keyPair;
  p12: p12;
};

export type otherCharges = {
  TipoDocumento: otherChargesDocumentType;
  NumeroIdentidadTercero?: string;
  NombreTercero?: string;
  Detalle: string;
  Porcentaje?: number;
  MontoCargo: number;
};

/* ==============================================================================
                                      Enum Types
   ============================================================================== */

export enum idType {
  Fisica = "01",
  Juridica = "02",
  DIMEX = "03",
  NITE = "04"
}
export enum commercialCodeType {
  Vendedor = "01",
  Comprador = "02",
  Industria = "03",
  Interno = "04",
  Otro = "99"
}
export enum taxCode {
  ValorAgregado = "01",
  SelectivoDeConsumo = "02",
  Combustivos = "03",
  BebidasAlcoholicas = "04",
  BebidasEmbasadasYJabonesDeTocador = "05",
  Tabacos = "06",
  IVACalculoEspecial = "07",
  IVABienesUsados = "08",
  Cemento = "09",
  Otros = "99"
}
export enum taxCodeRate {
  Exempto = "01",
  UnoPorciento = "02",
  DosPorciento = "03",
  CuatroPorciento = "04",
  TransitorioCeroPorciento = "05",
  TransitorioCuatroPorciento = "06",
  TransitorioOchoPorciento = "07",
  TarifaGeneralTrecePorciento = "08"
}
export enum ExoneratedrationdocumentType {
  ComprasAutorizadas = "01",
  ExemptSalesToDiplomats = "02",
  SpecialLaw = "03",
  GeneralExemptionsHacienda = "04",
  TransitorioV = "05",
  TransitorioIX = "06",
  TransitorioXVII = "07",
  Otros = "99"
}
export enum referenceDocumentType {
  FacturaElectronica = "01",
  NotaDebitoElectronica = "02",
  NotaCreditoElectronica = "03",
  TiqueteElectronico = "04",
  NotaDespacho = "05",
  Contrato = "06",
  Procedimiento = "07",
  ComprobanteContigencia = "08",
  DevolucionMercaderia = "09",
  FacturaRechazadaHacienda = "10",
  FacturaElectronicaComprobante = "11",
  FacturaExportacion = "12",
  FacturacionMesVendido = "13",
  Otros = "99"
}
// Código de referencia.
// 01 Anula documento de referencia,
// 02 Corrige texto de documento de referencia,
// 03 Corrige monto,
// 04 Referencia a otro documento,
// 05 Sustituye comprobante provisional por contigencia,
// 99 Otros
export enum referenceCode {
  NullifyReferencedDocument = "01",
  CorrectReferencedDocumentText = "02",
  CorrectAmount = "03",
  ReferenceOtherDocument = "04",
  SubstituteProvisionalReceipt = "05",
  Others = "99"
}
export enum documentType {
  FacturaElectronica = "01",
  NotaDebito = "02",
  NotaCredito = "03",
  TiqueteElectronico = "04",
  ConfirmacionRecepcion = "05",
  ConfirmacionAcceptacion = "06",
  ConfirmacionRechazo = "07",
  FacturaElectronicaCompras = "08",
  FacturaElectronicaExportacion = "09"
}
export enum documentSituation {
  Normal = "01",
  Contingency = "02",
  NoInternet = "03"
}
export enum saleCondition {
  Contado = "01",
  Credito = "02",
  Consignacion = "03",
  Apartado = "04",
  ArrendamientoConOpcionCompra = "05",
  ArrendamientoFuncionFinanciera = "06",
  CobroFavorTercero = "07",
  ServiciosPrestadosAlEstado = "08",
  PagoServicioPrestado = "90",
  Otros = "99"
}
export enum paymentType {
  Cash = "01",
  CreditDebitCard = "02",
  Check = "03",
  BankTransforDeposit = "04",
  Terceros = "05"
}
export enum otherChargesDocumentType {
  ContribucionFiscal = "01",
  TimbreCruzRoja = "02",
  TimbreBomberos = "03",
  Tercero = "04",
  Exportacion = "05",
  ImpuestoServicioDiesPorciento = "06",
  TimbreColegiosPrefecionales = "07",
  Others = "99"
}

export type unidadMedida =
  | "Al"
  | "Alc"
  | "Cm"
  | "I"
  | "Os"
  | "Sp"
  | "Spe"
  | "St"
  | "d"
  | "m"
  | "kg"
  | "s"
  | "A"
  | "K"
  | "mol"
  | "cd"
  | "m²"
  | "m³"
  | "m/s"
  | "m/s²"
  | "1/m"
  | "kg/m³"
  | "A/m²"
  | "A/m"
  | "mol/m³"
  | "cd/m²"
  | "1"
  | "rad"
  | "sr"
  | "Hz"
  | "N"
  | "Pa"
  | "J"
  | "W"
  | "C"
  | "V"
  | "F"
  | "Ω"
  | "S"
  | "Wb"
  | "T"
  | "H"
  | "°C"
  | "lm"
  | "lx"
  | "Bq"
  | "Gy"
  | "Sv"
  | "kat"
  | "Pa·s"
  | "N·m"
  | "N/m"
  | "rad/s"
  | "rad/s²"
  | "W/m²"
  | "J/K"
  | "J/(kg·K)"
  | "J/kg"
  | "W/(m·K)"
  | "J/m³"
  | "V/m"
  | "C/m³"
  | "C/m²"
  | "F/m"
  | "H/m"
  | "J/mol"
  | "J/(mol·K)"
  | "C/kg"
  | "Gy/s"
  | "W/sr"
  | "W/(m²·sr)"
  | "kat/m³"
  | "min"
  | "h"
  | "d"
  | "º"
  | "´"
  | "´´"
  | "L"
  | "t"
  | "Np"
  | "B"
  | "eV"
  | "u"
  | "ua"
  | "Unid"
  | "Gal"
  | "g"
  | "Km"
  | "Kw"
  | "ln"
  | "cm"
  | "mL"
  | "mm"
  | "Oz"
  | "Otros";

export type currencyCode =
  | "AED"
  | "AFN"
  | "ALL"
  | "AMD"
  | "ANG"
  | "AOA"
  | "ARS"
  | "AUD"
  | "AWG"
  | "AZN"
  | "BAM"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BHD"
  | "BIF"
  | "BMD"
  | "BND"
  | "BOB"
  | "BOV"
  | "BRL"
  | "BSD"
  | "BTN"
  | "BWP"
  | "BYR"
  | "BZD"
  | "CAD"
  | "CDF"
  | "CHE"
  | "CHF"
  | "CHW"
  | "CLF"
  | "CLP"
  | "CNY"
  | "COP"
  | "COU"
  | "CRC"
  | "CUC"
  | "CUP"
  | "CVE"
  | "CZK"
  | "DJF"
  | "DKK"
  | "DOP"
  | "DZD"
  | "EGP"
  | "ERN"
  | "ETB"
  | "EUR"
  | "FJD"
  | "FKP"
  | "GBP"
  | "GEL"
  | "GHS"
  | "GIP"
  | "GMD"
  | "GNF"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "IQD"
  | "IRR"
  | "ISK"
  | "JMD"
  | "JOD"
  | "JPY"
  | "KES"
  | "KGS"
  | "KHR"
  | "KMF"
  | "KPW"
  | "KRW"
  | "KWD"
  | "KYD"
  | "KZT"
  | "LAK"
  | "LBP"
  | "LKR"
  | "LRD"
  | "LSL"
  | "LYD"
  | "MAD"
  | "MDL"
  | "MGA"
  | "MKD"
  | "MMK"
  | "MNT"
  | "MOP"
  | "MRO"
  | "MUR"
  | "MVR"
  | "MWK"
  | "MXN"
  | "MXV"
  | "MYR"
  | "MZN"
  | "NAD"
  | "NGN"
  | "NIO"
  | "NOK"
  | "NPR"
  | "NZD"
  | "OMR"
  | "PAB"
  | "PEN"
  | "PGK"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RON"
  | "RSD"
  | "RUB"
  | "RWF"
  | "SAR"
  | "SBD"
  | "SCR"
  | "SDG"
  | "SEK"
  | "SGD"
  | "SHP"
  | "SLL"
  | "SOS"
  | "SRD"
  | "SSP"
  | "STD"
  | "SVC"
  | "SYP"
  | "SZL"
  | "THB"
  | "TJS"
  | "TMT"
  | "TND"
  | "TOP"
  | "TRY"
  | "TTD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "UGX"
  | "USD"
  | "USN"
  | "UYI"
  | "UYU"
  | "UZS"
  | "VEF"
  | "VND"
  | "VUV"
  | "WST"
  | "XAF"
  | "XAG"
  | "XAU"
  | "XBA"
  | "XBB"
  | "XBC"
  | "XBD"
  | "XCD"
  | "XDR"
  | "XOF"
  | "XPD"
  | "XPF"
  | "XPT"
  | "XSU"
  | "XTS"
  | "XUA"
  | "XXX"
  | "YER"
  | "ZAR"
  | "ZMW"
  | "ZWL";
