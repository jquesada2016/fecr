import {
  generateReceiver,
  id,
  location,
  phoneNumber,
  receiver,
} from "../../../types";

export class Receiver {
  constructor(receiver: receiver) {
    if (receiver.name.length <= 100) this.name = receiver.name;
    else throw Error("receiver name must be <= 100 characters in length");
    this.id.Numero = receiver.id;
    const matchId = receiver.id.match(/\d{9,13}/g);
    if (matchId && matchId[0] === receiver.id) this.id.Numero = receiver.id;
    else
      throw new Error(
        "receiver ID number must be between 9 and 13 digits in length",
      );
    if (receiver.foreignId) {
      if (receiver.foreignId.length <= 20) this.foreignId = receiver.foreignId;
      else
        throw Error("receiver foreign ID must be <= 20 characters in length");
    }
    if (receiver.comercialName) {
      if (receiver.comercialName.length <= 80)
        this.comercialName = receiver.comercialName;
      else
        throw Error(
          "receiver commercialName must be <= 80 characters in length",
        );
    }
    if (receiver.location) {
      if (
        receiver.location.OtrasSenas &&
        receiver.location.OtrasSenas.length <= 250
      )
        this.location = receiver.location;
      else
        throw new Error(
          "receiver location OtrasSenas must be <= 250 characters in length",
        );
      this.location = { ...receiver.location };
    }
    if (receiver.foreignOthers) {
      if (receiver.foreignOthers.length <= 300)
        this.foreignOthers = receiver.foreignOthers;
      else
        throw new Error(
          "receiver foreignOthers must be <= 300 characters in length",
        );
    }
    if (receiver.phone) {
      const countryCodeMatch = receiver.phone.CodigoPais.match(/\d{3}/g);
      if (
        !countryCodeMatch ||
        countryCodeMatch[0] !== receiver.phone.CodigoPais
      )
        throw Error("issuer phone country code must be <= 3 digits in length");

      const phoneNumberMatch = receiver.phone.NumTelefono.match(/\d{1,20}/g);
      if (
        !phoneNumberMatch ||
        phoneNumberMatch[0] !== receiver.phone.NumTelefono
      )
        throw new Error("receiver phone number must be <= 20 digits in length");

      this.phone = receiver.phone;
    }
    if (receiver.fax) {
      const countryCodeMatch = receiver.fax.CodigoPais.match(/\d{3}/g);
      if (!countryCodeMatch || countryCodeMatch[0] !== receiver.fax.CodigoPais)
        throw Error("receiver fax country code must be <= 3 digits in length");

      const faxNumberMatch = receiver.fax.NumTelefono.match(/\d{1,20}/g);
      if (!faxNumberMatch || faxNumberMatch[0] !== receiver.fax.NumTelefono)
        throw new Error("receiver fax number must be <= 20 digits in length");

      this.fax = receiver.fax;
    }
    if (receiver.email) {
      const emailRegExp = /\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*/g;
      const emailMatch = receiver.email.match(emailRegExp);
      if (
        emailMatch &&
        emailMatch[0] === receiver.email &&
        receiver.email.length <= 160
      )
        this.email = receiver.email;
      else
        throw new Error(
          "receiver email address must be <= 160 characters in length, and must match the regular expression",
        );
    }
  }

  name: string;
  id: id;
  foreignId?: string;
  comercialName?: string;
  location?: location;
  foreignOthers?: string;
  phone?: phoneNumber;
  fax?: phoneNumber;
  email?: string;

  generate() {
    const obj = {} as generateReceiver;
    obj.Nombre = this.name;
    obj.Identificacion = { Tipo: this.id.Tipo, Numero: this.id.Numero };
    if (this.foreignId) {
      obj.IdentificacionExtranjero = this.foreignId;
    }
    if (this.comercialName) {
      obj.NombreComercial = this.comercialName;
    }
    if (this.location) {
      obj.Ubicacion = { ...this.location };
    }
    if (this.foreignOthers) {
      obj.OtrasSenasExtranjero = this.foreignOthers;
    }
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
    if (this.email) {
      obj.CorreoElectronico = this.email;
    }
    return obj;
  }
}
