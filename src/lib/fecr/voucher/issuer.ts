import {
  issuer,
  generateIssuer,
  location,
  phoneNumber,
  id,
} from "../../../types";

export class Issuer {
  constructor(issuer: issuer) {
    if (issuer.name.length <= 100) this.name = issuer.name;
    else throw new Error("issuer name must be <= 100 characters in length");
    const matchId = issuer.id.match(/\d{9,13}/g);
    if (matchId && matchId[0] === issuer.id) this.id.Numero = issuer.id;
    else
      throw new Error(
        "issuer ID number must be between 9 and 13 digits in length",
      );
    if (issuer.commercialName)
      if (issuer.commercialName?.length <= 80)
        this.commercialName = issuer.commercialName;
      else
        throw new Error(
          "issuer commercialName must be <= 80 characters in length",
        );
    if (issuer.location.OtrasSenas && issuer.location.OtrasSenas.length <= 250)
      this.location = issuer.location;
    else
      throw new Error(
        "issuer location OtrasSenas must be <= 250 characters in length",
      );
    if (issuer.phone) {
      const countryCodeMatch = issuer.phone.CodigoPais.match(/\d{3}/g);
      if (!countryCodeMatch || countryCodeMatch[0] !== issuer.phone.CodigoPais)
        throw Error("issuer phone country code must be <= 3 digits in length");

      const phoneNumberMatch = issuer.phone.NumTelefono.match(/\d{1,20}/g);
      if (!phoneNumberMatch || phoneNumberMatch[0] !== issuer.phone.NumTelefono)
        throw new Error("issuer phone number must be <= 20 digits in length");

      this.phone = issuer.phone;
    }
    if (issuer.fax) {
      const countryCodeMatch = issuer.fax.CodigoPais.match(/\d{3}/g);
      if (!countryCodeMatch || countryCodeMatch[0] !== issuer.fax.CodigoPais)
        throw Error("issuer fax country code must be <= 3 digits in length");

      const faxNumberMatch = issuer.fax.NumTelefono.match(/\d{1,20}/g);
      if (!faxNumberMatch || faxNumberMatch[0] !== issuer.fax.NumTelefono)
        throw new Error("issuer fax number must be <= 20 digits in length");

      this.fax = issuer.fax;
    }

    const emailRegExp = /\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*/g;
    const emailMatch = issuer.email.match(emailRegExp);
    if (
      emailMatch &&
      emailMatch[0] === issuer.email &&
      issuer.email.length <= 160
    )
      this.email = issuer.email;
    else
      throw new Error(
        "issuer email address must be <= 160 characters in length, and must match the regular expression",
      );
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
      OtrasSenas: this.location.OtrasSenas,
    };
    if (this.phone) {
      obj.Telefono = {
        CodigoPais: this.phone.CodigoPais,
        NumTelefono: this.phone.NumTelefono,
      };
    }
    if (this.fax) {
      obj.Fax = {
        CodigoPais: this.fax.CodigoPais,
        NumTelefono: this.fax.NumTelefono,
      };
    }
    obj.CorreoElectronico = this.email;
    return obj;
  }
}
