import { PaymentScreen } from "@ebanking/screens";
import api from "../../lib/api";

export default function Payment() {
  return <PaymentScreen api={api} />;
}
