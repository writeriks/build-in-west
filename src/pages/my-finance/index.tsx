import React from "react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSetAdminUser from "../../hooks/use-set-admin-user";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import authenticationService from "../../service/authentication-service.ts/authentication-service";

import { type User } from "@prisma/client";
import { PlusCircle } from "lucide-react";

const MyFinance = ({ dbUser }: { dbUser: User }) => {
  useSetAdminUser(dbUser);

  return (
    <div className="flex h-[calc(100vh-60px)] w-screen flex-col">
      <div className="h-full w-full bg-yellow-400">
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
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const dbUser = await authenticationService.getUserWithSession(req, res);
    return {
      props: { dbUser: JSON.parse(JSON.stringify(dbUser)) as User },
    };
  },
});

export default MyFinance;
