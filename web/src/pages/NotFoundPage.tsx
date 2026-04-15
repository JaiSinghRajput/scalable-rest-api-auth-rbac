import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

export const NotFoundPage = () => {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="mt-2 text-slate-500">The page you requested does not exist.</p>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Go home</Link>
        </Button>
      </div>
    </div>
  );
};
