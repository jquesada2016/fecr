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

/** @todo: need to cross verify with XSD document to guerantee the validity fields*/
export type issuer = {
  name: string;
  idType: string;
  id: string;
  commercialName: string;
  location: location;
  phone: phoneNumber;
  fax?: phoneNumber;
  email: string;
};

/** @todo: need to cross verify with XSD document to guerantee the validity fields*/
export type item = {
  number: string;
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
  id: "fisica" | "juridica" | "DIMEX" | "NITE";
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
  Identificación: id;
  NombreComercial: string;
  Ubicación: location;
  Teléfono: phoneNumber;
  Fax: phoneNumber;
  CorreoElectrónico: string;
};

export type generateItem = {
  NumeroLinea: string;
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
export type id = { Tipo: "01" | "02" | "03" | "04"; Numero: string };
