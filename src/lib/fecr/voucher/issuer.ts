import {
  issuer,
  generateIssuer,
  location,
  phoneNumber,
  id
} from "../../../types";

export class Issuer {
  constructor(issuer: issuer) {
    this.name = issuer.name;
    this.id.Numero = issuer.id;
    this.commercialName = issuer.commercialName;
    this.location = issuer.location;
    this.phone = issuer.phone;
    this.fax = issuer.fax;
    this.email = issuer.email;
  }

  name: string;
  id: id;
  commercialName?: string;
  location: location;
  phone?: phoneNumber;
  fax?: phoneNumber;
  email: string;

  generate() {
    const obj = {} as generateIssuer;
    obj.Nombre = this.name;
    obj.Identificacion = this.id;
    if (this.commercialName) {
      obj.NombreComercial = this.commercialName;
    }
    obj.Ubicacion = {
      Provincia: this.location.Provincia,
      Canton: this.location.Canton,
      Distrito: this.location.Distrito,
      OtrasSenas: this.location.OtrasSenas
    };
    if (this.phone) {
      obj.Telefono = {
        CodigoPais: this.phone.CodigoPais,
        NumTelefono: this.phone.NumTelefono
      };
    }
    if (this.fax) {
      obj.Fax = {
        CodigoPais: this.fax.CodigoPais,
        NumTelefono: this.fax.NumTelefono
      };
    }
    obj.CorreoElectronico = this.email;
    return obj;
  }
}
