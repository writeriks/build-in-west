import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PlusCircle } from "lucide-react";
import { type User } from "@prisma/client";

interface FinanceHeroCardProps {
  dbUser: User;
}

const FinanceHeroCard: React.FC<FinanceHeroCardProps> = ({ dbUser }) => {
  return (
    <div className="px-5 py-5 md:px-11">
      <Card>
        <CardHeader>
          <CardTitle className="flex text-lg">
            <span className="pr-5">
              {dbUser.name} {dbUser.lastname}&apos;s Finances
            </span>
            <button title="Add New Expense">
              <PlusCircle size={24} />
            </button>
          </CardTitle>
          <CardDescription>Welcome to your finances page</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FinanceHeroCard;
