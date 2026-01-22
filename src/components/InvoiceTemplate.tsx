import React from 'react';

export interface InvoiceData {
  date: string;
  clientName: string;
  itemDescription: string;
  feeDescription: string;
  feeAmount: string;
  workSummary: string;
  routingNumber: string;
  bankNumber: string;
}

interface InvoiceTemplateProps {
  data: InvoiceData;
}

export const InvoiceTemplate = React.forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="bg-white p-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
            Jubilee studio
          </h1>
          <p className="text-gray-500 text-sm">
            www.jubil.ee | eileen@jubil.ee | 360-224-5533 | 399 Webster St. San Francisco CA 94117
          </p>
        </div>

        {/* Invoice Title */}
        <h2 className="text-xl font-bold mb-4">Invoice</h2>

        {/* Date */}
        <p className="mb-6">{data.date}</p>

        {/* To */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">To</h3>
          <p className="text-gray-600">{data.clientName}</p>
        </div>

        {/* Item */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Item</h3>
          <p className="text-gray-600">{data.itemDescription}</p>
        </div>

        {/* Fees Table */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Fees</h3>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr>
                <td className="border-r border-gray-300 p-3 text-gray-600">
                  {data.feeDescription}
                </td>
                <td className="p-3">${data.feeAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Work Summary */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Work Summary</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{data.workSummary}</p>
        </div>

        {/* Total */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Total Amount of Invoice</h3>
          <p className="text-gray-600">${data.feeAmount}</p>
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Payment</h3>
          <p className="text-gray-600 mb-4">
            Upon receipt of this invoice, payment should be made to:
          </p>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-r border-gray-300 p-3 text-left font-normal text-gray-600">
                  Name
                </th>
                <th className="border-r border-gray-300 p-3 text-left font-normal text-gray-600">
                  Routing Number
                </th>
                <th className="p-3 text-left font-normal text-gray-600">Bank Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-gray-300 p-3">Jubilee Studio</td>
                <td className="border-r border-gray-300 p-3">{data.routingNumber}</td>
                <td className="p-3">{data.bankNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Thank you & Signature */}
        <div>
          <h3 className="font-bold mb-4">Thank you</h3>
          <div className="mb-4">
            <img
              src="/signature.png"
              alt="Signature"
              className="h-16"
              onError={(e) => {
                // If signature image doesn't exist, hide it
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <p className="text-gray-600">Eileen Jubilee</p>
        </div>
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';
