import React, { createContext, useContext, useState } from "react";

interface AppState {
  moneyInPocket: number;
  moneyInBankAccount: number;
  hasBankAccount: boolean;
  completedStages: {
    stage3WantVsNeed: boolean;
    stage4BudgetBoss: boolean;
    stage8SmartInvestor: boolean;
    stage10PiggyPuzzle: boolean;
    // Add other stages like stage4EarnMoney, etc.
  };
  updatePocket: (amount: number) => void;
  updateBank: (amount: number) => void;
  setHasBankAccount: (value: boolean) => void;
  markStageComplete: (stageKey: keyof AppState["completedStages"]) => void;
  resetGame: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [moneyInPocket, setMoneyInPocket] = useState(0);
  const [moneyInBankAccount, setMoneyInBankAccount] = useState(0);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [completedStages, setCompletedStages] = useState({
    stage3WantVsNeed: false,
    stage4BudgetBoss: false,
    stage8SmartInvestor: false,
    stage10PiggyPuzzle: false,
    // Add future stages here
  });

  const updatePocket = (amount: number) => {
    setMoneyInPocket((prev) => Math.max(prev + amount, 0));
  };

  const updateBank = (amount: number) => {
    setMoneyInBankAccount((prev) => Math.max(prev + amount, 0));
  };

  const markStageComplete = (stageKey: keyof typeof completedStages) => {
    setCompletedStages((prev) => ({ ...prev, [stageKey]: true }));
  };

  const resetGame = () => {
    setMoneyInPocket(0);
    setMoneyInBankAccount(0);
    setHasBankAccount(false);
    setCompletedStages({
      stage3WantVsNeed: false,
      stage4BudgetBoss: false,
      stage8SmartInvestor: false,
      stage10PiggyPuzzle: false,
      // reset others here too
    });
  };

  return (
    <AppContext.Provider
      value={{
        moneyInPocket,
        moneyInBankAccount,
        hasBankAccount,
        completedStages,
        updatePocket,
        updateBank,
        setHasBankAccount,
        markStageComplete,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🔁 The new hook name
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
