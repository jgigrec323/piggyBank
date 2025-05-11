import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Types
export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Goal = {
  id: string;
  description: string;
  targetCoins: number;
  progress: number;
  achieved: boolean;
};

type Transaction = {
  id: string;
  label: string;
  amount: number;
};

type Child = {
  id: string;
  name: string;
  avatar: string;
  themeColor: string;
  tasks: Task[];
  goals: Goal[];
  pocket: number;
  bank: number;
  transactions: Transaction[];
};

// ✅ Context type
type ParentContextType = {
  children: Child[];
  addChild: (
    child: Omit<
      Child,
      "id" | "tasks" | "goals" | "pocket" | "bank" | "transactions"
    >
  ) => void;
  addTask: (childId: string, task: Task) => void;
  deleteTask: (childId: string, taskId: string) => void;
  toggleTask: (childId: string, taskId: string) => void;
  addGoal: (childId: string, goal: Goal) => void;
  addMoneyToPocket: (childId: string, amount: number, label: string) => void;
};

const ParentContext = createContext<ParentContextType | undefined>(undefined);

// ✅ Provider
export const ParentProvider = ({ children }: { children: ReactNode }) => {
  const [childList, setChildList] = useState<Child[]>([]);

  const addChild = (
    child: Omit<
      Child,
      "id" | "tasks" | "goals" | "pocket" | "bank" | "transactions"
    >
  ) => {
    const newChild: Child = {
      ...child,
      id: Date.now().toString(),
      tasks: [],
      goals: [],
      pocket: 0,
      bank: 0,
      transactions: [],
    };
    setChildList((prev) => [...prev, newChild]);
  };

  const addTask = (childId: string, task: Task) => {
    setChildList((prev) =>
      prev.map((child) =>
        child.id === childId
          ? { ...child, tasks: [...child.tasks, task] }
          : child
      )
    );
  };

  const deleteTask = (childId: string, taskId: string) => {
    setChildList((prev) =>
      prev.map((child) =>
        child.id === childId
          ? { ...child, tasks: child.tasks.filter((t) => t.id !== taskId) }
          : child
      )
    );
  };

  const toggleTask = (childId: string, taskId: string) => {
    setChildList((prev) =>
      prev.map((child) =>
        child.id === childId
          ? {
              ...child,
              tasks: child.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
              pocket: child.pocket + 5, // reward logic
              transactions: [
                {
                  id: Date.now().toString(),
                  label: "Task completed",
                  amount: 5,
                },
                ...child.transactions,
              ],
            }
          : child
      )
    );
  };

  const addGoal = (childId: string, goal: Goal) => {
    setChildList((prev) =>
      prev.map((child) =>
        child.id === childId
          ? { ...child, goals: [...child.goals, goal] }
          : child
      )
    );
  };

  const addMoneyToPocket = (childId: string, amount: number, label: string) => {
    setChildList((prev) =>
      prev.map((child) =>
        child.id === childId
          ? {
              ...child,
              pocket: child.pocket + amount,
              transactions: [
                {
                  id: Date.now().toString(),
                  label,
                  amount,
                },
                ...child.transactions,
              ],
            }
          : child
      )
    );
  };

  return (
    <ParentContext.Provider
      value={{
        children: childList,
        addChild,
        addTask,
        deleteTask,
        toggleTask,
        addGoal,
        addMoneyToPocket,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};

export const useParent = () => {
  const context = useContext(ParentContext);
  if (!context) throw new Error("useParent must be used within ParentProvider");
  return context;
};
