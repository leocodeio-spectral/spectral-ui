import Header from "@/components/landing/header";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation("common");

  return (
    <div className="flex h-screen items-center justify-center">
      <Header />
      <h1 className="text-4xl font-bold">{t("welcome")}</h1>
      {/* <h1 className="text-4xl font-bold">{t("welcome")}</h1> */}
    </div>
  );
}
