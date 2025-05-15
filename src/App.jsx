import MainContent from "./MainContent";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="text-white bg-background font-inter">
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <NavBar />
        <MainContent />
      </div>
    </div>
  );
};

export default App;