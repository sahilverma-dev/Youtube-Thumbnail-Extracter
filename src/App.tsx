import Footer from "./components/custom/footer";
import Header from "./components/custom/header";
import ThumbnailForm from "./components/custom/thumbnail-form";

const App = () => {
  return (
    <div className="w-full h-dvh flex flex-col">
      <Header />
      <ThumbnailForm />
      <Footer />
    </div>
  );
};

export default App;
