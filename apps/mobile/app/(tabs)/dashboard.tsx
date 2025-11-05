import { DashboardScreen } from "@ebanking/screens";
import api from "../../lib/api";

export default function Dashboard() {
  return <DashboardScreen api={api} />;
}
