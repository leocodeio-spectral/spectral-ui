import { action as getLinkUrlAction } from "@/routes/action+/creator+/accounts+/get-link-url.action";

export default function GetUrlLink() {
  return <div>GetUrlLink</div>;
}

export const loader = () => {
  return null;
};

export const action = getLinkUrlAction;
