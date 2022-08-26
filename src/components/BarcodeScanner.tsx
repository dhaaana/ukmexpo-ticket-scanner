import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Modal, ModalPropsInterface } from "./Modal";

interface IBarcodeScanner
  extends Omit<ModalPropsInterface, "className" | "as" | "children"> {
  setBarcodeId: React.Dispatch<React.SetStateAction<string>>;
}

export default function BarcodeScanner({
  isOpen,
  setIsOpen,
  setBarcodeId,
}: IBarcodeScanner) {
  const [data, setData] = React.useState("Not Found");
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.getText());
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </Modal>
  );
}
