import "./App.css";

const App = () => {
  return (
    <div>
      <div className="App">Pick dates</div>
      <form onSubmit="">
        <input type="date" placeholder="Edit post" />
        <input type="date" placeholder="Edit post" />
        <button>Save</button>
      </form>
    </div>
  );
};

export default App;
