/*
 * Creator Dashboard
 *
 * This is the dashboard for the creator
 *
 * three sections
 * 1. Accounts linked navigation box
 * 2. Editors linked navigation box
 * 3. Settings navigation box
 * 4. [optional] Some kind of metrics
 */

export interface CreatorDashboardProps {}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "~/components/common/charts/CreatorChart";
import { Link } from "@remix-run/react";

export const CreatorDashboard = ({}: CreatorDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 p-6">
        {/* Accounts Linked */}
        <Card>
          <CardHeader>
            <CardTitle>Linked Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your connected social and content platforms.
            </p>
            <Button variant="default" className="w-full">
              <Link to="/feature/accounts">View Accounts</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Editors Linked */}
        <Card>
          <CardHeader>
            <CardTitle>Editors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Invite or manage users who help edit your content.
            </p>
            <Button variant="default" className="w-full">
              <Link to="/feature/editors">Manage Editors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Optional Metrics */}
      <Card className="border-none shadow-none ">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get insights on views, engagement, and growth.
          </p>
          {/* Placeholder for chart or stats */}
          <ChartAreaInteractive />
        </CardContent>
      </Card>
    </div>
  );
};
