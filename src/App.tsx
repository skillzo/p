import "./App.css";
import FinancingForm from "./component/Form";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-4 text-center">
          Financing Request Portal
        </h1>
        <FinancingForm />
      </div>
    </>
  );
}

export default App;
