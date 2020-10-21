import React from 'react';
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {
  //url variable
  const url = "https://runnersbackend.herokuapp.com"

  //state to hold shoes
  const [runners, setRunners] = React.useState([])

  //empty shoe form
  const emptyRunners = {
    name: "",
    runStyle: "",
    // shoes: [{ type: mongoose.Types.ObjectId, ref: "Shoes" }]
  }

  //select shoe

  const [selectedRunners, setSelectedRunners] = React.useState(emptyRunners)

  //fetch shoes
  const getRunners = () => {
    fetch(url + "/runners")
      .then(response => response.json())
      .then(data => {
        setRunners(data)
      })
  }

  //get shoes on page
  React.useEffect(() => {
    getRunners()
  }, [])

  //handle create to creat a shoe on submit
  const handleCreate = (newRunner) => {
    fetch(url + "/runners", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRunner)
    })
      .then(response => getRunners())
  }

  //update shoe when form is clicked
  const handleUpdate = (runners) => {
    fetch(url + "/runners" + runners._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(runners)
    })
      .then(response => getRunners())
  }

  //select a shoe

  const selectRunners = (runners) => {
    setSelectedRunners(runners)
  }

  //delete a shoe
  const deleteRunners = (runners) => {
    fetch(url + "/runners" + runners._id, {
      method: "delete"
    })
      .then(response => getRunners())
  }


  return (
    <div className="App">
      <h1>Runners and Shoes</h1>
      <hr />
      <Link to="/create">
        <button>Add Shoes</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/"
            render={(rp) => (
              <Display
                {...rp}
                runners={runners}
                selectRunners={selectRunners}
                deleteRunners={deleteRunners} />
            )}
          />
          <Route exact path="/create"
            render={(rp) => (
              <Form {...rp} label="create" runners={emptyRunners}
                handleSubmit={handleCreate} />
            )}
          />
          <Route exact path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" runners={selectedRunners}
                handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;

// //import React from 'react';
// import './App.css';
// import { Route, Link, Switch } from "react-router-dom";
// import Display from "./Display";
// import Form from "./Form";

// function App() {
//   //url variable
//   const url = "https://runnersbackend.herokuapp.com"

//   //state to hold shoes
//   const [shoes, setShoes] = React.useState([])

//   //empty shoe form
//   const emptyShoes = {
//     name: "",
//     runType: "",
//     img: ""
//   }

//   //select shoe

//   const [selectedShoes, setSelectedShoes] = React.useState(emptyShoes)

//   //fetch shoes
//   const getShoes = () => {
//     fetch(url + "/shoes/")
//       .then(response => response.json())
//       .then(data => {
//         setShoes(data)
//       })
//   }

//   //get shoes on page
//   React.useEffect(() => {
//     getShoes()
//   }, [])

//   //handle create to creat a shoe on submit
//   const handleCreate = (newShoe) => {
//     fetch(url + "/shoes/", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newShoe)
//     })
//       .then(response => getShoes())
//   }

//   //update shoe when form is clicked
//   const handleUpdate = (shoes) => {
//     fetch(url + "/shoes/" + shoes._id, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(shoes)
//     })
//       .then(response => getShoes())
//   }

//   //select a shoe

//   const selectShoes = (shoes) => {
//     setSelectedShoes(shoes)
//   }

//   //delete a shoe
//   const deleteShoes = (shoes) => {
//     fetch(url + "/shoes" + shoes._id, {
//       method: "delete"
//     })
//       .then(response => getShoes())
//   }


//   return (
//     <div className="App">
//       <h1>Runners and Shoes</h1>
//       <hr />
//       <Link to="/create">
//         <button>Add Shoes</button>
//       </Link>
//       <main>
//         <Switch>
//           <Route exact path="/"
//             render={(rp) => (
//               <Display
//                 {...rp}
//                 shoes={shoes}
//                 selectShoes={selectShoes}
//                 deleteShoes={deleteShoes} />
//             )}
//           />
//           <Route exact path="/create"
//             render={(rp) => (
//               <Form {...rp} label="create" shoes={emptyShoes}
//                 handleSubmit={handleCreate} />
//             )}
//           />
//           <Route exact path="/edit"
//             render={(rp) => (
//               <Form {...rp} label="update" shoes={selectedShoes}
//                 handleSubmit={handleUpdate} />
//             )}
//           />
//         </Switch>
//       </main>
//     </div>
//   );
// }

// export default App;
