import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Modal, ModalPropsInterface } from "./Modal";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../assets/Spinner";

interface IBarcodeScanner
  extends Omit<ModalPropsInterface, "className" | "as" | "children"> {
  setBarcodeId: React.Dispatch<React.SetStateAction<string>>;
}

export default function BarcodeScanner({
  isOpen,
  setIsOpen,
  setBarcodeId,
}: IBarcodeScanner) {
  const [ticketId, setTicketId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [ticketType, setTicketType] = React.useState<string>("ps1");
  const [ticketResponse, setTicketResponse] = React.useState<any>();

  const baseUrl =
    ticketType === "ps1"
      ? "https://admin.tesdeveloper.me/api/scan-tiket/2"
      : "https://admin.tesdeveloper.me/api/scan-tiket";

  const redeemHandler = async () => {
    setIsLoading(true);
    const ticket = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({ uniqueId: ticketId }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!ticket.ok) {
      toast.error("Error");
    }
    const response = await ticket.json();
    console.log(response);
    if (response.message !== "Ticket successfully redeemed") {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }
    toast.success(response.message);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Toaster />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h3 className="text-center">Scan Ticket</h3>
        {!ticketId ? (
          <>
            <div className="flex items-center mx-auto py-5 justify-center">
              <label htmlFor="ticket-type">Tipe Tiket:</label>
              <select
                name="ticket-type"
                id="ticket-type"
                className="p-2 mx-2 rounded-md focus:outline-none focus:ring focus:ring-lime-200 w-[80%]"
                onChange={(e) => setTicketType(e.target.value)}
              >
                <option value="ps1">Presale 1</option>
                <option value="not-ps1">Selain Presale 1</option>
              </select>
            </div>
            <BarcodeScannerComponent
              height={500}
              onUpdate={(err, result) => {
                if (result) setTicketId(result.getText());
              }}
            />
          </>
        ) : (
          <div>
            <p className="py-5">
              Ticket ID: <span className="font-semibold">{ticketId}</span>
            </p>
            <div className="flex justify-end gap-x-3">
              <button
                className="btn bg-red-600 text-white"
                onClick={() => setTicketId("")}
                disabled={isLoading}
              >
                Scan Again
              </button>
              <button
                className="btn bg-green-600 text-white"
                onClick={() => redeemHandler()}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : <p>Redeem</p>}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
