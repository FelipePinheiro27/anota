import AppRoutes from "./routes/Routes";
import { ClientReservationProvider } from "./context/ClientReservationProvider";

export default function App() {
  return (
    <ClientReservationProvider>
      <AppRoutes />
    </ClientReservationProvider>
  );
}
