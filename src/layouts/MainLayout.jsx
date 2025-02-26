import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <section>
        <Navbar />
      </section>
      <section>
        <Outlet />
      </section>
      <section></section>
    </div>
  );
};

export default MainLayout;
