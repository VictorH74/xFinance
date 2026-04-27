import { PageTitle } from "@/components/pages/protected/PageTitle";
import { Metadata } from "next";
import React from "react";
import { GoalsList } from "../../../components/pages/protected/goals/GoalsList";
import { listGoalsAction } from "@/lib/modules/goals/domain/goal.action";

const goals = [
  {
    name: "Emergency fund",
    current: 14800,
    target: 30000,
    deadline: "Dec 2026",
    category: "Safety",
  },
  {
    name: "Vacation in Japan",
    current: 6200,
    target: 12000,
    deadline: "Apr 2027",
    category: "Lifestyle",
  },
  {
    name: "Home office upgrade",
    current: 1800,
    target: 3500,
    deadline: "Aug 2026",
    category: "Productivity",
  },
];



export const metadata: Metadata = {
  title: "XFinance | Goals",
};



export default async function GoalsPage() {
  // const goals = await listGoalsAction()

  return <GoalsList  />
}
