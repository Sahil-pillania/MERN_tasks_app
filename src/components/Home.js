import React from "react";

import Notes from "./Notes";

const Home = ({ showAlert }) => {
  //console.log(notes);

  return (
    <div>
      {/* Notes Component added */}
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
