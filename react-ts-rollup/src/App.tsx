import logo from "./assets/logo.png"; // Import the logo image

const App = () => {
    return (
        <div>
          <h1>Hello, React + TypeScript + Rollup!</h1>
          <img src={logo} alt="Logo" /> {/* Use the imported logo here */}
        </div>
    );
};

export default App;