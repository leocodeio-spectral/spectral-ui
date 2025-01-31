import { Banner } from "@/components/common/banner";

export default function Landing() {
  //   const { t } = useTranslation();

  return (
    <div className="flex h-screen items-center justify-center">
      {/* <Header /> */}
      {/* <h1 className="text-4xl font-bold">{t("welcome")}</h1> */}
      <Banner />
    </div>
  );
}
