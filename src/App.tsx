import React from "react";
import BarcodeScanner from "./components/BarcodeScanner";

function App() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 md:px-12 border-2 ">
        <div className="shadow-lg relative flex w-screen flex-col rounded-xl bg-cwhite lg:w-[56em]">
          <div className="">
            <img
              src="svg/bg-register.svg"
              className="lg:w-[56em]"
              alt="header"
            />
          </div>
          <h1 className="text-center mt-10 mb-5">Redeem Ticket</h1>
          <BarcodeScanner isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}

export default App;
