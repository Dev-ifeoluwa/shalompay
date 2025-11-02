export const convertCurrencyApi = async (
  from: string,
  to: string,
  amount: number
) => {
  const token = localStorage.getItem("token"); // or get from cookies if using cookies

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const res = await fetch(`${API_URL}/currency/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 Attach JWT token for backend auth
    },
    body: JSON.stringify({ from, to, amount }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Conversion failed");
  }

  return res.json(); // { rate, convertedAmount }
};
