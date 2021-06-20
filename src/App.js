import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css'


function Home(){
  function movetostocks(e){
    window.location.href='/2021-1-fe-seminar/stocks'
  }
  function movetoportfolio(e){
    window.location.href='/2021-1-fe-seminar/portfolio'
  }
  return(
    <div class='App'>
      <div class='header'>
        <h1>홈 화면</h1>
      </div>
      <div class='body'>
        <button onClick={movetostocks}>
          <h1>주가 확인</h1>
        </button>
        <button onClick={movetoportfolio}>
          <h1>포트폴리오 작성</h1>
        </button>
      </div>
    </div>
  )
}

class Stocks extends Component{
  constructor(){
    super();
    this.state={
      sector:[['A기업','117.62','-0.54%'],['AA기업','19.02','+1.24%']]
    }
  }
  movetohome(){
    window.location.href='/'
  }
  changeSector1=()=>{
    this.setState({
      sector:[['A기업','117.62','-0.54%'],['AA기업','19.02','+1.24%']]
    })
  }
  changeSector2=()=>{
    this.setState({
      sector:[['B기업','117.62','-0.54%'],['BB기업','19.02','+1.24%']]
    })
  }
  changeSector3=()=>{
    this.setState({
      sector:[['C기업','117.62','-0.54%'],['CC기업','19.02','+1.24%']]
    })
  }
  render(){
    return(
      <div class='App'>
        <div class='header'>
            <h1 onClick={this.movetohome}>홈 화면</h1>
        </div>
        <div class='buttonbox'>
          <button onClick={this.changeSector1}>섹터1</button>
          <button onClick={this.changeSector2}>섹터2</button>
          <button onClick={this.changeSector3}>섹터3</button>
        </div>
        <div class='body'>
          <table border="1">
            <th>회사명</th>
            <th>주가($)</th>
            <th>전일 대비 상승률</th>
            {this.state.sector.map((comp,index)=>(
              <tr>
                <td>{comp[0]}</td>
                <td>{comp[1]}</td>
                <td>{comp[2]}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }
    
}

class Portfolio extends Component{
  constructor(){
    super();
    this.state={
      adding:false,
      company:'',
      price:'',
      count:'',
      portfolio:[]
    }
    this.showPortfolio=this.showPortfolio.bind(this);
    this.add=this.add.bind(this);
    this.addcomp=this.addcomp.bind(this);
  }
  movetohome(){
    window.location.href='/'
  }

  addcomp(){
    var port=this.state.portfolio;
    port.push([this.state.comp, this.state.price,this.state.count]);
    this.setState({
      portfolio:port,
      comp:'',
      price:'',
      count:'',
      adding:false
    })
  }
  add(){
    if(this.state.adding==false){
      return(
        <div class='buttonbox'>
          <button onClick={(e)=>this.setState({adding:true})}>종목 추가</button>
        </div>
      )
    }
    else{
      return(
        <div class='buttonbox'>
        <form>
        <input
          placeholder="회사명"
          value={this.state.comp}
          onChange={this.handleChangecomp}
        />
      </form>
      <form>
        <input
          placeholder="매수가"
          value={this.state.price}
          onChange={this.handleChangeprice}
        />
      </form>
      <form>
        <input
          placeholder="수량"
          value={this.state.count}
          onChange={this.handleChangecount}
        />
      </form>
      <button onClick={this.addcomp}>추가</button>
        </div>
      )
    }
  }

  handleChangecomp=(e)=>{
    this.setState({
      comp:e.target.value
    })
  }
  handleChangeprice=(e)=>{
    this.setState({
      price:e.target.value
    })
  }
  handleChangecount=(e)=>{
    this.setState({
      count:e.target.value
    })
  }
  deleteComp(index,e){
    var port=this.state.portfolio;
    port.splice(index,1);
    this.setState({
      portfolio:port
    })
  }
  showPortfolio(props){
    
    if(props.portfolio.length==0){
      return(
        <div class='body'>
         <h2>포트폴리오가 비어있습니다!</h2>
       </div>
      )
    }
    else{
      return(
        <div class='body'>
          <div class='portbody'>
            <table border="1">
              <th>회사명</th>
              <th>매수가</th>
              <th>수량</th>
              {props.portfolio.map((comp,index)=>(
                <tr>
                  <td>{comp[0]}</td>
                  <td>{comp[1]}</td>
                  <td>{comp[2]+'주'}</td>
                  <td><button id='delbutton' onClick={(e)=>{this.deleteComp(index,e)}}>삭제</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
            );
    }
  }

  render(){
    let addcomp=<this.add />;
    let table=<this.showPortfolio portfolio={this.state.portfolio}/>;
    return(
      <div class='App'>
        <div class='header'>
            <h1 onClick={this.movetohome}>홈 화면</h1>
        </div>
        {addcomp}
        {table}
      </div>
    )
  }
}

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/2021-1-fe-seminar/stocks">
            <Stocks></Stocks>
          </Route>
          <Route path="/2021-1-fe-seminar/portfolio">
            <Portfolio></Portfolio>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
