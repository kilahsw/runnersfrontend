import React from 'react';
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {
  //url variable
  const url = "https://runnersbackend.herokuapp.com"

  //state to hold shoes
  const [shoes, setShoes] = React.useState([])

  //empty shoe form
  const emptyShoes = {
    name: "",
    runType: "",
    img: "",
    // shoes: [{ type: mongoose.Types.ObjectId, ref: "Shoes" }]
  }

  //select shoe

  const [selectedShoes, setSelectedShoes] = React.useState(emptyShoes)

  //fetch shoes
  const getShoes = () => {
    fetch(url + "/shoes")
      .then((response) => response.json())
      .then((data) => {
        setShoes(data);
        console.log(`data`, data);
      });
  }

  //get shoes on page
  React.useEffect(() => {
    getShoes()
  }, [])

  //handle create to creat a shoe on submit
  const handleCreate = (newShoe) => {
    fetch(url + "/runners", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newShoe)
    })
      .then(response => getShoes())
  }

  //update shoe when form is clicked
  const handleUpdate = (shoes) => {
    fetch(url + "/runners" + shoes._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shoes)
    })
      .then(response => getShoes())
  }

  //select a shoe

  const selectShoes = (shoes) => {
    setSelectedShoes(shoes)
  }

  //delete a shoe
  const deleteShoes = (shoes) => {
    fetch(url + "/runners" + shoes._id, {
      method: "delete"
    })
      .then(response => getShoes())
  }


  return (
    <div className="App">
      <h1>Runners and Shoes</h1>
      <Link to="/create">
        <button>Add Shoes</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/shoes"
            render={(rp) => (
              <Display
                {...rp}
                shoes={shoes}
                selectShoes={selectShoes}
                deleteShoes={deleteShoes} />
            )}
          />
          <Route exact path="/create"
            render={(rp) => (
              <Form {...rp} label="create" shoes={emptyShoes}
                handleSubmit={handleCreate} />
            )}
          />
          <Route exact path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" shoes={selectedShoes}
                handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
