import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Modal, ModalPropsInterface } from "./Modal";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../assets/Spinner";
import BarcodeManualInput from "./BarcodeManualInput";
import CheckIcon from "../assets/CheckIcon";

type IBarcodeScanner = Omit<
  ModalPropsInterface,
  "className" | "as" | "children"
>;

export default function BarcodeScanner({ isOpen, setIsOpen }: IBarcodeScanner) {
  const [ticketId, setTicketId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [ticketType, setTicketType] = React.useState<string>("ps1");

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
      setIsLoading(false);
      return;
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
    setIsSuccess(true);
  };

  return (
    <>
      <Toaster />
      <button
        onClick={() => {
          setTicketType("ps1");
          setIsOpen(true);
        }}
        className="btn btn-gradient mx-auto mt-5 mb-14"
      >
        Scan Here
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {isSuccess ? (
          <>
            <div className="text-green-700 flex flex-col items-center bg-cgreenb py-5 rounded-md my-3">
              <CheckIcon />
              <h4>Ticket successfully redeemed</h4>
              <div className="flex justify-center mt-8">
                <button
                  className="btn bg-lime-50"
                  onClick={() => {
                    setTicketId("");
                    setTicketType("ps1");
                    setIsSuccess(false);
                  }}
                  disabled={isLoading}
                >
                  Scan Again
                </button>
              </div>
            </div>
          </>
        ) : !ticketId ? (
          <div>
            <h3 className="text-center">Scan Ticket</h3>
            <BarcodeScannerComponent
              height={500}
              onUpdate={(err, result) => {
                if (result) setTicketId(result.getText());
              }}
            />
            <BarcodeManualInput setTicketId={setTicketId} ticketId={ticketId} />
          </div>
        ) : (
          <div className="">
            <h3 className="text-center">Scan Ticket</h3>
            <p className="pb-2 pt-5 text-center">
              Ticket ID: <span className="font-semibold">{ticketId}</span>
            </p>
            <div className="flex items-center pt-5 pb-7 justify-center">
              <label htmlFor="ticket-type" className="whitespace-nowrap mr-2">
                Tipe Ticket:
              </label>
              <select
                name="ticket-type"
                id="ticket-type"
                className="input"
                onChange={(e) => setTicketType(e.target.value)}
                required
              >
                <option value="ps1">Presale 1</option>
                <option value="not-ps1">Selain Presale 1</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="btn bg-red-600 text-white"
                onClick={() => {
                  setTicketId("");
                  setTicketType("ps1");
                }}
                disabled={isLoading}
              >
                Scan Again
              </button>
              <BarcodeManualInput
                setTicketId={setTicketId}
                ticketId={ticketId}
                isEdit
              />
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
