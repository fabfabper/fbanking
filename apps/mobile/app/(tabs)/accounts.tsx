import { AccountsScreen } from "@ebanking/screens";
import api from "../../lib/api";

export default function Accounts() {
  return <AccountsScreen api={api} />;
}
