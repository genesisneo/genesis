import Navigation from "../Navigation/Navigation";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

const ApplicationLayout = ({ children }: React.PropsWithChildren) => (
  <div className="ApplicationLayout">
    <Navigation />
    <Loading />
    <main id="main">{children}</main>
    <Footer />
  </div>
);

export default ApplicationLayout;
