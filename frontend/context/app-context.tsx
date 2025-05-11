import React, { createContext, useContext, useState, ReactNode } from "react";

export type Transaction = {
  id: string;
  label: string;
  amount: number;
};

interface BankUser {
  name: string;
  password: string;
}

interface CompletedStages {
  stage3WantVsNeed: boolean;
  stage4BudgetBoss: boolean;
  stage8SmartInvestor: boolean;
  stage10PiggyPuzzle: boolean;
}

interface AppState {
  moneyInPocket: number;
  moneyInBankAccount: number;
  hasBankAccount: boolean;
  bankBalance: number;
  bankTransactions: Transaction[];
  bankUser: BankUser | null;
  purchasedItems: string[];
  completedStages: CompletedStages;
  updatePocket: (amount: number) => void;
  updateBank: (amount: number) => void;
  setHasBankAccount: (value: boolean) => void;
  setBankUser: (user: BankUser | null) => void;
  markStageComplete: (stageKey: keyof CompletedStages) => void;
  resetGame: () => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  addBankTransaction: (tx: { label: string; amount: number }) => void;
  spendFromPocket: (amount: number) => boolean;
  addPurchasedItem: (itemName: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [moneyInPocket, setMoneyInPocket] = useState(0);
  const [moneyInBankAccount, setMoneyInBankAccount] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [bankTransactions, setBankTransactions] = useState<Transaction[]>([]);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [bankUser, setBankUser] = useState<BankUser | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [completedStages, setCompletedStages] = useState<CompletedStages>({
    stage3WantVsNeed: false,
    stage4BudgetBoss: false,
    stage8SmartInvestor: false,
    stage10PiggyPuzzle: false,
  });

  const updatePocket = (amount: number) => {
    setMoneyInPocket((prev) => Math.max(prev + amount, 0));
  };

  const updateBank = (amount: number) => {
    setMoneyInBankAccount((prev) => Math.max(prev + amount, 0));
  };

  const deposit = (amount: number) => {
    setBankBalance((prev) => prev + amount);
    updatePocket(-amount);
    addBankTransaction({ label: "Deposit from Pocket", amount });
  };

  const withdraw = (amount: number) => {
    setBankBalance((prev) => prev - amount);
    updatePocket(amount);
    addBankTransaction({ label: "Withdraw to Pocket", amount: -amount });
  };

  const addBankTransaction = (tx: { label: string; amount: number }) => {
    setBankTransactions((prev) => [
      { id: Date.now().toString(), ...tx },
      ...prev,
    ]);
  };

  const spendFromPocket = (amount: number) => {
    if (moneyInPocket < amount) return false;
    setMoneyInPocket((prev) => prev - amount);
    return true;
  };

  const addPurchasedItem = (itemName: string) => {
    setPurchasedItems((prev) => [...prev, itemName]);
  };

  const markStageComplete = (stageKey: keyof CompletedStages) => {
    setCompletedStages((prev) => ({ ...prev, [stageKey]: true }));
  };

  const resetGame = () => {
    setMoneyInPocket(0);
    setMoneyInBankAccount(0);
    setBankBalance(0);
    setBankTransactions([]);
    setHasBankAccount(false);
    setBankUser(null);
    setPurchasedItems([]);
    setCompletedStages({
      stage3WantVsNeed: false,
      stage4BudgetBoss: false,
      stage8SmartInvestor: false,
      stage10PiggyPuzzle: false,
    });
  };

  return (
    <AppContext.Provider
      value={{
        moneyInPocket,
        moneyInBankAccount,
        hasBankAccount,
        bankBalance,
        bankTransactions,
        bankUser,
        purchasedItems,
        completedStages,
        updatePocket,
        updateBank,
        setHasBankAccount,
        setBankUser,
        markStageComplete,
        resetGame,
        deposit,
        withdraw,
        addBankTransaction,
        spendFromPocket,
        addPurchasedItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
