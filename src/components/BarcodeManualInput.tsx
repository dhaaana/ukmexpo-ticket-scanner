import React from "react";
import { Modal } from "./Modal";

interface IBarcodeManualInput {
  setTicketId: React.Dispatch<React.SetStateAction<string>>;
  ticketId: string;
  isEdit?: boolean;
}

export default function BarcodeManualInput({
  setTicketId,
  ticketId,
  isEdit = false,
}: IBarcodeManualInput) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (form) {
      setTicketId(form["uniqueId"].value);
      setIsOpen(false);
    }
  };

  return (
    <>
      {isEdit ? (
        <button
          className="btn bg-sky-600 text-white"
          onClick={() => setIsOpen(true)}
        >
          Edit Ticket ID
        </button>
      ) : (
        <div className="flex justify-center mt-4">
          <button className="btn btn-gradient" onClick={() => setIsOpen(true)}>
            Input Manual
          </button>
        </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h3 className="text-center pb-2">Input Manual</h3>
        <form ref={formRef} onSubmit={submitHandler}>
          <div className="flex items-center py-5 justify-center">
            <label htmlFor="ticket-type" className="whitespace-nowrap mr-2">
              Ticket ID:
            </label>
            <input
              className="input"
              type="text"
              id="uniqueId"
              name="uniqueId"
              defaultValue={ticketId}
              required
            />
          </div>
          <div className="flex justify-center gap-x-3">
            <button
              className="btn bg-red-600 text-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button className="btn bg-green-600 text-white" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
