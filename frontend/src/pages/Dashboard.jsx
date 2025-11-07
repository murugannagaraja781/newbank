import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const Dashboard = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get("/accounts/summary");
      setAccount(data);
    };
    fetchData();
  }, []);

  if (!account) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {account.accountHolderName}
      </h1>
      <p>Account Type: {account.accountType}</p>
      <p>Balance: ₹{account.balance}</p>
      <p>Account No: {account.accountNumber}</p>
    </div>
  );
};

export default Dashboard;
