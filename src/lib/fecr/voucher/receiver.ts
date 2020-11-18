import {
  generateReceiver,
  id,
  location,
  phoneNumber,
  receiver
} from "../../../types";

export class Receiver {
  constructor(receiver: receiver) {
    this.name = receiver.name;
    this.id.Numero = receiver.id;
    if (receiver.foreignId) {
      this.foreignId = receiver.foreignId;
    }
    if (receiver.comercialName) {
      this.comercialName = receiver.comercialName;
    }
    if (receiver.location) {
      this.location = { ...receiver.location };
    }
    if (receiver.foreignOthers) {
      this.foreignOthers = receiver.foreignOthers;
    }
    if (receiver.phone) {
      this.phone = receiver.phone;
    }
    if (receiver.fax) {
      this.fax = receiver.fax;
    }
    if (receiver.email) {
      this.email = receiver.email;
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
        NumTelefono: this.phone.NumTelefono
      };
    }
    if (this.fax) {
      obj.Fax = {
        CodigoPais: this.fax.CodigoPais,
        NumTelefono: this.fax.NumTelefono
      };
    }
    if (this.email) {
      obj.CorreoElectronico = this.email;
    }
    return obj;
  }
}
