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
  id: string;
  commercialName: string;
  location: location;
  phone: phoneNumber;
  fax?: phoneNumber;
  email: string;
};

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

export type others = {
  text: string;
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

export type location = {
  Provincia: string;
  Canton: string;
  Distrito: string;
  OtrasSenas: string;
};
export type phoneNumber = { CodigoPais: "506"; NumTelefono: string };
export type id = { Tipo: string; Numero: string };
