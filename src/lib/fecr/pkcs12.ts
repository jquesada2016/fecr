import { pem } from "../../types";

const openssl = require("openssl-nodejs");
const fs = require("fs");
const path = require("path");

// 'openssl pkcs12 -in '+p12+' -nodes -passin pass:'+pass

export const signer = {
  /**
   * @description This function returns a string containing the cryptographic key
   * @param {string} p12 - Path to p12 file
   * @param {string} pass - Pin created at cryptographic key download screen from Hacienda
   */
  p12ToPemString(p12: string, pass: string) {
    return new Promise<string>((resolve, reject) => {
      openssl(
        ["pkcs12", " -in ", p12, " -nodes ", " -passin ", ` pass:${pass}`],
        (error: Error, buffer: Buffer) => {
          if (error.toString()) {
            reject(error.toString());
          } else {
            resolve(buffer.toString());
          }
        }
      );
    });
  },
  /** @description This function copies the p12 cryptographic key to openssl/<basename>
   * @param {string} pathP12 - The path to the original p12 file
   */
  copyFileP12(pathP12: string) {
    return new Promise<string>((resolve, reject) => {
      const basename = path.basename(pathP12);
      fs.copyFile(pathP12, `openssl/${basename}`, (err: Error) => {
        if (err) reject(err);
        resolve(basename);
      });
    });
  },
  /**
   * @description This function converts the extracted cryptographic key and chain from
   * the p12 file and converts it into a JSON object
   * @param {string} pem - The extracted p12 string
   */
  pem2js(pem: string): pem {
    const key = pem.match(
      /-----BEGIN PRIVATE KEY-----[\S\s]*?-----END PRIVATE KEY-----/g
    )![0];
    const chain = pem.match(
      /-----BEGIN CERTIFICATE-----[\S\s]*?-----END CERTIFICATE-----/g
    )![0];
    return { key, chain };
  },
  /**
   * @description This function converts the passed string into a base64 Array Buffer
   * @param {string} pem - The string to be converted to base64
   */
  pem2der(pem: string) {
    const preparedPem = this.preparePem(pem);
    // convert base64 to ArrayBuffer
    return new Uint8Array(Buffer.from(preparedPem, "base64"));
  },
  /**
   * @description This function strips the begin/end portions from the string
   * @param {string} pem - The string to have the annotation removed
   */
  preparePem(pem: string) {
    return (
      pem
        // remove BEGIN/END
        .replace(/-----(BEGIN|END)[\w\d\s]+-----/g, "")
        // remove \r, \n
        .replace(/[\r\n]/g, "")
    );
  },
  /**
   * @description This function gets the key pair from the p12 file
   * @param {string} p12Path - Path to the original p12 cryptographic key file
   * @param pass
   */
  getKeyPair(p12Path: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.copyFileP12(p12Path)
        .then((newPath) => this.p12ToPemString(newPath, pass))
        .then((pem) => {
          try {
            fs.unlinkSync(`./openssl/${path.basename(p12Path)}`);
          } catch (e) {
            reject(e);
          }
          const keyPairPem = this.pem2js(pem);
          const keyPair = {
            key: this.preparePem(keyPairPem.key),
            x509: this.preparePem(keyPairPem.chain)
          };
          resolve(keyPair);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default signer;
