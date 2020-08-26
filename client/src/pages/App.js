import React from 'react';

function App() {

  const logout = () =>{
    localStorage.clear()
    window.location.href = "./login";
  }

  return (
    <div className="App">
      <h1 onClick={logout}>Logout</h1>
    </div>
  );
}

export default App;
