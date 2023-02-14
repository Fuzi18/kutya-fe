import React, { Component } from 'react';
import './App.css';

interface State {
  kutyak : Kutya[];
  ujNev: string;
  ujKor: number;
}

interface Kutya {
  id: number;
  nev: string;
  kor : number;
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      ujNev: '',
      ujKor: 0,
      kutyak: [],
    }
  }


  async Kutyabetoltes() {
    let response = await fetch('http://localhost:3000/api/kutya');
    let data = await response.json() as Kutya[];
    this.setState({
      kutyak: data,
    })
  }

  componentDidMount() {
    this.Kutyabetoltes();
  }

  async DeleteKutya(id: number){
    await fetch('http://localhost:3000/api/kutya/'+ id, {
      method: 'DELETE',
    })
    await this.Kutyabetoltes();
  }

  Felvetelkezeles = async () => {
    const { ujNev, ujKor} = this.state;
    if(ujNev.trim() === '' || ujKor <=0) {
     return;
    }

    const adat = {
      nev: ujNev,
      kor: ujKor,
    };

    await fetch('http://localhost:3000/api/kutya', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      ujNev: '',
      ujKor: 0,
    })

    await this.Kutyabetoltes();

  }


  render(){
    const { ujNev, ujKor } = this.state;

    return <div>
      <h2>Új Kutya hozzáadása</h2>
      <div className="adatok">
      Név: <input type='text' value={ujNev} onChange={e => this.setState({ujNev: e.currentTarget.value})}></input><br/>
      Kor: <input type='number' value={ujKor} onChange={e => this.setState({ ujKor: parseInt(e.currentTarget.value)})}></input><br/></div>
      <button onClick={this.Felvetelkezeles}>Felvétel</button>
      <h2>Kutyák</h2>
      <ul>
        {
          this.state.kutyak.map((kutya) => <table><tr><td>{kutya.nev} | {kutya.kor} <button onClick= {() => this.DeleteKutya(kutya.id)}>Törlés</button></td></tr></table>)
        }
      </ul>
    </div>
  }
}

export default App;