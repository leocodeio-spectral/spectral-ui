import { Link, useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Dashboard() {
  let { t, i18n } = useTranslation();
  let navigate = useNavigate();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-auto max-w-sm text-center">
        <div className="mb-4">
          <Select
            onValueChange={handleLanguageChange}
            defaultValue={i18n.language}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <h1>{t("greeting")}</h1>
        <Button>
          <Link to="/">Logout</Link>
        </Button>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
