import React, { useEffect, useState } from "react";
import {
  Chart,
  PieController,
  LineController,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

Chart.register(
  PieController,
  LineController,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

interface RecordItem {
  id: string;
  time: string;
  type: "received" | "paid";
  item: string;
  amount: number;
  balance: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  records: RecordItem[];
  createdAt: string;
}

const LS_USERS = "moneymap_users_v2";
const LS_CURRENT = "moneymap_current_v2";

const loadUsers = (): Record<string, User> =>
  JSON.parse(localStorage.getItem(LS_USERS) || "{}");
const saveUsers = (u: Record<string, User>) =>
  localStorage.setItem(LS_USERS, JSON.stringify(u));
const setCurrent = (email: string) => localStorage.setItem(LS_CURRENT, email);
const getCurrent = (): string | null => localStorage.getItem(LS_CURRENT);

const formatMoney = (v: number) =>
  "₹ " + Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 });

export const MoneyMap: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [dcType, setDcType] = useState<"received" | "paid">("received");
  const [dcItem, setDcItem] = useState("");
  const [dcAmount, setDcAmount] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [pane, setPane] = useState<"main" | "dc" | "analytics">("main");

  useEffect(() => {
    const cur = getCurrent();
    if (cur) {
      const u = loadUsers()[cur];
      if (u) setUser(u);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const users = loadUsers();
      users[user.email] = user;
      saveUsers(users);
    }
  }, [user]);

  const handleRegister = () => {
    const { name, email, phone, password } = form;
    if (!name || !email || !password) {
      alert("Enter name, email and password");
      return;
    }
    const users = loadUsers();
    const newUser: User = {
      name,
      email: email.toLowerCase(),
      phone,
      password,
      records: users[email]?.records || [],
      createdAt: new Date().toISOString(),
    };
    users[email] = newUser;
    saveUsers(users);
    setCurrent(email);
    setUser(newUser);
    setNotification("Saved & logged in");
  };

  const handleLogin = () => {
    const { email, password } = form;
    const users = loadUsers();
    const u = users[email];
    if (!u || u.password !== password) {
      alert("Invalid credentials");
      return;
    }
    setCurrent(email);
    setUser(u);
    setNotification("Logged in");
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_CURRENT);
    setUser(null);
    setPane("main");
  };

  const handleAddRecord = () => {
    if (!user) return alert("Login first");
    if (!dcAmount || dcAmount <= 0) return alert("Enter positive amount");

    const prevBalance =
      user.records.length > 0
        ? user.records[user.records.length - 1].balance
        : 0;
    const newBalance =
      dcType === "received" ? prevBalance + dcAmount : prevBalance - dcAmount;
    const record: RecordItem = {
      id: Math.random().toString(36).slice(2),
      time: new Date().toISOString(),
      type: dcType,
      item: dcItem || "(no item)",
      amount: dcAmount,
      balance: newBalance,
    };
    const updated = { ...user, records: [...user.records, record] };
    setUser(updated);
    setDcAmount(0);
    setDcItem("");
    setNotification("Record added");
  };

  const aggregateByItem = (records: RecordItem[], type: string) => {
    const map: Record<string, number> = {};
    records.forEach((r) => {
      if (r.type === type) map[r.item] = (map[r.item] || 0) + r.amount;
    });
    return {
      labels: Object.keys(map),
      values: Object.values(map),
    };
  };

  const records = user?.records || [];
  const { labels: paidLabels, values: paidValues } = aggregateByItem(
    records,
    "paid"
  );
  const { labels: receivedLabels, values: receivedValues } = aggregateByItem(
    records,
    "received"
  );

  const paidPieData = {
    labels: paidLabels,
    datasets: [{ data: paidValues, backgroundColor: ["#ef4444", "#f87171"] }],
  };
  const receivedPieData = {
    labels: receivedLabels,
    datasets: [{ data: receivedValues, backgroundColor: ["#10b981", "#6ee7b7"] }],
  };

  const lineLabels = records.map((r) =>
    new Date(r.time).toLocaleDateString("en-IN")
  );
  const balances = records.map((r) => r.balance);

  const balanceLineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Balance",
        data: balances,
        fill: true,
        backgroundColor: "rgba(30,120,255,0.12)",
        borderColor: "#1e78ff",
      },
    ],
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Money Tools</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">MoneyMap</h1>
          <p className="text-gray-600 dark:text-gray-300">Local-only — stores data in your browser (React + TS)</p>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {user ? `${user.name} (${user.email})` : "Not logged in"}
          </div>
        </header>

        {!user && (
          <div className="glassmorphism p-8 rounded-3xl max-w-2xl mx-auto">
            <div className="grid gap-4">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 outline-none"
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 outline-none"
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleRegister}
                className="px-4 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg"
              >
                Register / Save
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-3 bg-white/40 dark:bg-gray-800/40 rounded-xl border border-pink-200 dark:border-pink-500/30"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {user && (
          <>
            <div className="glassmorphism p-6 rounded-3xl mb-6">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-gray-500">Bank Balance</div>
                  <div className="text-3xl font-bold mt-1">
                    {formatMoney(
                      user.records.length
                        ? user.records[user.records.length - 1].balance
                        : 0
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Records: {user.records.length}</div>
                </div>

                <div className="ml-auto flex gap-3">
                  <button
                    onClick={() => setPane("dc")}
                    className={`px-4 py-2 rounded-xl font-medium ${pane === "dc" ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white" : "bg-white/40"}`}
                  >
                    Debit - Credit
                  </button>
                  <button
                    onClick={() => setPane("analytics")}
                    className={`px-4 py-2 rounded-xl font-medium ${pane === "analytics" ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white" : "bg-white/40"}`}
                  >
                    Analytics
                  </button>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-white/40">Logout</button>
                </div>
              </div>
            </div>

            {pane === "dc" && (
              <div className="glassmorphism p-6 rounded-3xl mb-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4">Debit / Credit</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    value={dcType}
                    onChange={(e) => setDcType(e.target.value as "received" | "paid")}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30"
                  >
                    <option value="received">Received</option>
                    <option value="paid">Paid</option>
                  </select>

                  <input
                    placeholder="Item"
                    value={dcItem}
                    onChange={(e) => setDcItem(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={dcAmount}
                    onChange={(e) => setDcAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30"
                  />
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleAddRecord}
                    className="px-5 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl font-semibold"
                  >
                    Save Record
                  </button>
                </div>

                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-sm">
                    <thead className="text-left text-gray-500">
                      <tr>
                        <th className="pb-2">Time</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Item</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...records].reverse().map((r) => (
                        <tr key={r.id} className={r.balance < 0 ? "text-red-600" : "text-green-600"}>
                          <td className="py-2">{new Date(r.time).toLocaleString()}</td>
                          <td className="py-2">{r.type}</td>
                          <td className="py-2">{r.item}</td>
                          <td className="py-2">{formatMoney(r.amount)}</td>
                          <td className="py-2">{formatMoney(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {pane === "analytics" && (
              <div className="glassmorphism p-6 rounded-3xl mb-6 max-w-6xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4">Analytics</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glassmorphism p-4 rounded-2xl">
                    <h4 className="font-medium mb-2">Spending (Paid) by Item</h4>
                    <Pie data={paidPieData} />
                  </div>
                  <div className="glassmorphism p-4 rounded-2xl">
                    <h4 className="font-medium mb-2">Received by Item</h4>
                    <Pie data={receivedPieData} />
                  </div>
                  <div className="glassmorphism p-4 rounded-2xl md:col-span-3 lg:col-span-3">
                    <h4 className="font-medium mb-2">Bank Balance vs Time</h4>
                    <Line data={balanceLineData} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {notification && (
          <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-lg">{notification}</div>
        )}
      </div>
    </div>
  );
};

export default MoneyMap;