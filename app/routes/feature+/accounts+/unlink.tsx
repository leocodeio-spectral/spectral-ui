import { action as unlinkAccountAction } from "@/routes/action+/creator+/accounts+/unlink-account.action";

export default function Unlink() {
  return <div>Unlink</div>;
}

export const loader = () => {
  return null;
};

export const action = unlinkAccountAction;
