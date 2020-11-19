/* ==============================================================================
                              Class Input Types
   ============================================================================== */

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
  text: string;
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
  OtroTexto: string;
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

/* ==============================================================================
                                      Data Types
   ============================================================================== */

export type location = {
  Provincia: string;
  Canton: string;
  Distrito: string;
  Barrio?: string;
  OtrasSenas: string;
};
export type phoneNumber = { CodigoPais: "506"; NumTelefono: string };
export type id = { Tipo: idType; Numero: string };
export type commercialCode = { Tipo: commercialCodeType; Codigo?: string };
export type discount = { MontoDescuento: number; NaturalezaDescuento: string };
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
  TipoDocumento: ExonerationdocumentType;
  NumeroDocumento: string;
  NombreInstitucion: string;
  FechaEmision: string;
  PorcentajeExoneracion: number;
  MontoExoneracion: number;
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
  Exento = "01",
  UnoPorciento = "02",
  DosPorciento = "03",
  CuatroPorciento = "04",
  TransitorioCeroPorciento = "05",
  TransitorioCuatroPorciento = "06",
  TransitorioOchoPorciento = "07",
  TarifaGeneralTrecePorciento = "08"
}
export enum ExonerationdocumentType {
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
