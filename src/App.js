import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      villains: [],
      henchmen: []
    }
  }
  componentDidMount() {
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/villains')
      .then(response => response.json())
      .then(villains => this.setState({villains}))
      .catch(error => console.log({ error }))
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/henchmen')
      .then(response => response.json())
      .then(henchmen => this.setState({henchmen}))
      .catch(error => console.log({error}))
  }

  createVillains() {
    const {villains} = this.state
    
    const villainsToShow = villains.map(villain => {
      return (
        <div key={villain.id}>
          <h2>{villain.name} - {villain.movie}</h2>
          <ul>
            {this.createHenchmen(villain.id)}
          </ul>
        </div>
      )
    })
    return villainsToShow
  }

  createHenchmen(villainId) {
    const {henchmen} = this.state
    const henchmenForVillain = henchmen.filter(henchman => villainId === henchman.villain_id)
    const henchmenToShow = henchmenForVillain.map(henchman => {
      return(
        <li key={henchman.id}>
          <h4>{henchman.name}</h4>
          <p>-{henchman.species}</p>
        </li>
      )
    })
    return henchmenToShow
  }

  render() {
    return (
      <div className="App">
        <h1>Disney Villains and Their Henchmen:</h1>
        {this.createVillains()}
      </div>
    );
  }
}

export default App;
