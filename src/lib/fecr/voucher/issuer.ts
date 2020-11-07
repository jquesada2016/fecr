import { issuer, generateIssuer, location, phoneNumber } from "../../../types";

export class Issuer {
  constructor(issuer: issuer) {
    this.name = issuer.name;
    this.idType = issuer.idType;
    this.id = issuer.id;
    this.commercialName = issuer.commercialName;
    this.location = issuer.location;
    this.phone = issuer.phone;
    this.fax = issuer.fax;
    this.email = issuer.email;
  }

  name: string;
  idType: string;
  id: string;
  commercialName: string;
  location: location;
  phone: phoneNumber;
  fax?: phoneNumber;
  email: string;

  generate() {
    const obj = {} as generateIssuer;
    obj.Nombre = this.name;
    obj.Identificación = { Tipo: this.idType, Numero: this.id };
    if (this.commercialName) {
      obj.NombreComercial = this.commercialName;
    }
    obj.Ubicación = {
      Provincia: this.location.Provincia,
      Canton: this.location.Canton,
      Distrito: this.location.Distrito,
      OtrasSenas: this.location.OtrasSenas
    };
    obj.Teléfono = {
      CodigoPais: this.phone.CodigoPais,
      NumTelefono: this.phone.NumTelefono
    };
    if (this.fax) {
      obj.Fax = {
        CodigoPais: this.fax.CodigoPais,
        NumTelefono: this.fax.NumTelefono
      };
    }
    obj.CorreoElectrónico = this.email;
    return obj;
  }
}
