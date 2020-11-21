import { Crypto } from "@peculiar/webcrypto";

import xadesjs from "xadesjs";
import { XMLSerializer } from "xmldom-alpha";
import { keyPair, cert } from "../../types/types.js";
import pkcs12 from "./pkcs12.js";

const crypto = new Crypto();
xadesjs.Application.setEngine("NodeJS", new Crypto());

async function signFromKeyPair(keyPair: keyPair, xmlString: string) {
  const hash = "SHA-256";
  const alg = {
    name: "RSASSA-PKCS1-v1_5",
    hash
  };

  // Read cert
  const { x509 } = keyPair;

  // Read key
  const keyDer = pkcs12.pem2der(keyPair.key);
  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyDer.buffer,
    alg,
    false,
    ["sign"]
  );

  // XAdES-EPES
  const xml = xadesjs.Parse(xmlString);

  const xadesXml = new xadesjs.SignedXml();

  const signature = await xadesXml.Sign(
    // Signing document
    alg, // algorithm
    key, // key
    xml, // document
    {
      // options
      x509: [x509],
      references: [
        {
          id: "r-id-1",
          uri: "",
          hash,
          transforms: ["enveloped"]
        }
      ],
      policy: {
        hash,
        identifier: {
          value:
            "https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica"
        }
      },
      signingCertificate: x509
    }
  );

  // append signature
  xml.documentElement.appendChild(signature.GetXml()!);

  // serialize XML
  const oSerializer = new XMLSerializer();
  const sXML: String = oSerializer.serializeToString(xml);
  return sXML.toString(); /**/
}

export const signXmlString = (xml: string, options: cert) =>
  new Promise<string>((resolve, reject) => {
    const { keyPair } = options;
    const { p12 } = options;
    if (keyPair) {
      signFromKeyPair(keyPair, xml)
        .then((xmlSigned) => {
          resolve(xmlSigned);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (p12) {
      pkcs12
        .getKeyPair(p12.path, p12.pass)
        .then((newKeyPair) => signFromKeyPair(newKeyPair, xml))
        .then((xmlSigned) => {
          resolve(xmlSigned);
        })
        .catch((err: Error) => {
          reject(err);
        });
    } else {
      reject(new Error("keyPair or p12 must to exist"));
    }
  });
