import React from "react";
import { metadata } from "./metadata";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";

export { metadata };

export default function QrCodeGeneratorPage() {
  return <QrCodeGeneratorClient />;
}
