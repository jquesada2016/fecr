export type apiType = {
  user: string;
  pass: string;
  environment: "stag" | "prod";
  token?: string;
  refresh?: string;
  expires?: number;
  refreshExpires?: number;
};

export type issuerType = {
  name: string;
  idType: string;
  id: string;
  commercialName: string;
  location: location;
  phone: phoneNumber;
  fax?: phoneNumber;
  email: string;
};
export type generateIssuerType = {
  Nombre: string;
  Identificación: id;
  NombreComercial: string;
  Ubicación: location;
  Teléfono: phoneNumber;
  Fax: phoneNumber;
  CorreoElectrónico: string;
};

export type location = {
  Provincia: string;
  Canton: string;
  Distrito: string;
  OtrasSenas: string;
};
export type phoneNumber = { CodigoPais: "506"; NumTelefono: string };
export type id = { Tipo: string; Numero: string };
