import { useState } from "react";
import { DollarSign, CreditCard, CreditCardIcon } from "lucide-react";

export default function ChoosePaymentMethod(props) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Payment method selected: ${paymentMethod}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
        <p className="text-sm text-gray-600 mb-6">Choose your preferred payment method</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <label
              className={`flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-800 ${
                paymentMethod === "cash" ? "border-primary" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <DollarSign className="mb-3 h-6 w-6" />
              Cash
            </label>
            <label
              className={`flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-800 ${
                paymentMethod === "debit" ? "border-primary" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("debit")}
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Debit
            </label>
            <label
              className={`flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-800 ${
                paymentMethod === "credit" ? "border-primary" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("credit")}
            >
              <CreditCardIcon className="mb-3 h-6 w-6" />
              Credit
            </label>
          </div>

          {paymentMethod === "cash" && (
            <div className="mt-4">
              <p>Please have exact change ready.</p>
            </div>
          )}

          {(paymentMethod === "debit" || paymentMethod === "credit") && (
            <div className="mt-4 space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="John Doe"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={()=>{props.setConfirmPayment(false)}}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
