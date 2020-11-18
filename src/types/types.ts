/** @todo: need to cross verify with XSD document to guerantee the validity fields*/
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

/** @todo: need to cross verify with XSD document to guerantee the validity fields*/
export type item = {
  number: number;
  hsCode?: string;
  code?: string;
  typeCommercialCode?: string;
  commercialCode?: string;
  quantity: number;
  unit: string;
  commercialUnit: string;
  description: string;
  unitPrice: number;
  total: number;
  discount?: number;
  discountReason?: string;
  subtotal: number;
  taxBase: number;
  taxes?: any;
  taxNet?: number;
  netTotal: number;
};

/** @todo: need to cross verify with XSD document to guerantee the validity fields*/
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
  CodigoComercial: { Tipo: string; Codigo: string };
  Cantidad: number;
  UnidadMedida: string;
  Detalle: string;
  PrecioUnitario: number;
  MontoTotal: number;
  Descuento: {
    MontoDescuento: number;
    NaturalezaDescuento: string;
  };
  SubTotal: number;
  BaseImponible: number;
  Impuesto: number;
  ImpuestoNeto: number;
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

export type location = {
  Provincia: string;
  Canton: string;
  Distrito: string;
  Barrio?: string;
  OtrasSenas: string;
};
export type phoneNumber = { CodigoPais: "506"; NumTelefono: string };
export type id = { Tipo: idType; Numero: string };
export type comercialCode = {
  tipo: " ";
};

export enum idType {
  Fisica = "01",
  Juridica = "02",
  DIMEX = "03",
  NITE = "04"
}
