// ...existing code...
import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  PieChart,
  DollarSign,
  Target,
  CreditCard,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
// removed invalid import 'href' from react-router-dom — not exported and unused

type CalculatorType = "profit" | "loan" | "budget" | "tax" | "monitor";

export default function FinanceToolkit() {
  const [ref, isInView] = useInView();
  const [activeCalculator, setActiveCalculator] =
    useState<CalculatorType>("profit");

  const calculators: {
    id: CalculatorType;
    name: string;
    icon: any;
    color: string;
  }[] = [
    {
      id: "profit",
      name: "Profit Calculator",
      icon: TrendingUp,
      color: "from-violet-400 to-rose-500",
    },
    {
      id: "loan",
      name: "Loan Calculator",
      icon: DollarSign,
      color: "from-rose-400 to-indigo-500",
    },
    {
      id: "budget",
      name: "Budget Planner",
      icon: PieChart,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "tax",
      name: "Tax Estimator",
      icon: Target,
      color: "from-pink-400 to-cyan-500",
    },
    {
      id: "monitor",
      name: "Loan Monitor",
      icon: CreditCard,
      color: "from-pink-400 to-blue-500",
    },
  ];

  const handleCardClick = (calc: typeof calculators[number]) => {
    setActiveCalculator(calc.id);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Calculator className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Financial Tools
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Finance Toolkit
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Smart financial tools to help you plan, track, and grow your
            business finances
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-12">
          {calculators.map((calc, index) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              index={index}
              active={activeCalculator === calc.id}
              onClick={() => handleCardClick(calc)}
            />
          ))}
        </div>

        <div className="glassmorphism p-8 rounded-3xl">
          {activeCalculator === "profit" && <ProfitCalculator />}
          {activeCalculator === "loan" && <LoanCalculator />}
          {activeCalculator === "budget" && <BudgetPlanner />}
          {activeCalculator === "tax" && <TaxEstimator />}
          {activeCalculator === "monitor" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-blue-500 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Loan Monitor (in-page)
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage debit/credit and analytics right inside the toolkit.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-pink-200/60 dark:border-pink-500/30 bg-white/70 dark:bg-gray-900/50 shadow-xl">
                <iframe
                  title="Loan Monitor"
                  src="/loan-monitor.html"
                  className="w-full h-[720px] md:h-[880px]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/loan-monitor.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-lg"
                >
                  Open in new tab
                </a>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Data stays in your browser; if the embed is blocked, use the button above.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalculatorCard({
  calculator,
  index,
  active,
  onClick,
}: {
  calculator: { id: CalculatorType; name: string; icon: any; color: string };
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const [ref, isInView] = useInView();
  const Icon = calculator.icon;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`cursor-pointer text-left glassmorphism p-6 rounded-3xl transition-all duration-500 flex flex-col items-start ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${active ? "ring-4 ring-pink-500 scale-105" : "hover:scale-105"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      aria-pressed={active}
      aria-label={calculator.name}
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${calculator.color} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {calculator.name}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {calculator.id === "monitor"
          ? "Open external loan monitor"
          : "Interactive calculator & planner"}
      </p>
    </button>
  );
}

/* ---------------- Calculators ---------------- */

function ProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [costs, setCosts] = useState("");
  const [result, setResult] = useState<{ profit: number; margin: number } | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue) || 0;
    const cost = parseFloat(costs) || 0;
    const profit = rev - cost;
    const margin = rev > 0 ? (profit / rev) * 100 : 0;
    setResult({ profit, margin });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Profit Calculator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Total Revenue
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Total Costs
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={costs}
              onChange={(e) => setCosts(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all mb-6"
      >
        Calculate Profit
      </button>

      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-pink-500 to-emerald-500 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Net Profit</p>
            <p
              className={`text-3xl font-bold ${
                result.profit >= 0 ? "text-pink-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              ${result.profit.toFixed(2)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-500 to-pink-500 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Profit Margin</p>
            <p className={`text-3xl font-bold ${result.margin >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {result.margin.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const period = parseFloat(years) || 0;

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = period * 12;

    const monthly =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const total = monthly * numberOfPayments;
    const interest = total - principal;

    setResult({ monthly: isFinite(monthly) ? monthly : 0, total, interest });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-indigo-500 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Loan Calculator</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50000"
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="8.5"
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Loan Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="5"
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <button onClick={calculate} className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all mb-6">
        Calculate EMI
      </button>

      {result && (
        <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Payment</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${result.monthly.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Payment</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${result.total.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Interest</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${result.interest.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function BudgetPlanner() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({
    rent: "",
    supplies: "",
    marketing: "",
    utilities: "",
    other: "",
  });

  const totalExpenses = Object.values(expenses).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );
  const remaining = (parseFloat(income) || 0) - totalExpenses;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <PieChart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Budget Planner</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Monthly Income</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="10000"
          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.entries(expenses).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 capitalize">
              {key}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setExpenses({ ...expenses, [key]: e.target.value })}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
            />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Income</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${(parseFloat(income) || 0).toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Expenses</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Remaining</p>
          <p className={`text-3xl font-bold ${remaining >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>${remaining.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

function TaxEstimator() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{ taxable: number; tax: number; net: number } | null>(null);

  const calculate = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    let tax = 0;
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }

    const netIncome = grossIncome - tax;
    setResult({ taxable: taxableIncome, tax, net: netIncome });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tax Estimator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Annual Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="500000"
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Deductions</label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="50000"
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <button onClick={calculate} className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all mb-6">
        Estimate Tax
      </button>

      {result && (
        <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Taxable Income</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">${result.taxable.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Tax</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">${result.tax.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Net Income</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">${result.net.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
// ...existing code...