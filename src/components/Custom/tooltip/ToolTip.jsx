import { format } from "date-fns";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const trx = payload[0].payload;

    console.log(trx)
    return (
      <div className="bg-green-50 border border-green-600 p-3 rounded-md shadow-md text-sm text-gray-800">
        <p><strong>User:</strong> {trx.name}</p>
        <p><strong>Amount:</strong> ${trx.amount}</p>
        <p><strong>Date:</strong> {format(new Date(trx.createdAt), "dd MMM yyyy")}</p>
        <p><strong>Policy:</strong> {trx.policeName}</p>
      </div>
    );
  }
  return null;
};
