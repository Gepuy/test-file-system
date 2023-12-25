import React from "react";
import Home from "./pages/Home";
import FilesSystemContextProvider from "./contexts/file-system-provider";

function App() {
  return (
    <FilesSystemContextProvider>
      <Home />
    </FilesSystemContextProvider>
  );
}

export default App;
