import './App.css';
import { useEffect, useState } from 'react';

function Money(){
const [money,setMoney] = useState(JSON.parse(localStorage.getItem('balance'))||0);
const [moneyValue, setValueMoney] = useState('')
const [addoperationmoney,setaddOperationMoney] = useState( JSON.parse(localStorage.getItem('addsum')) ||[])
const [removeoperationmoney,setremoveOperationMoney] = useState(JSON.parse(localStorage.getItem('removesum'))|| [])

useEffect(() =>{
  localStorage.setItem('addsum',JSON.stringify(addoperationmoney))
},[addoperationmoney]
)

useEffect(() => {
  localStorage.setItem('removesum',JSON.stringify(removeoperationmoney))
},[removeoperationmoney])


useEffect(()=>{
  localStorage.setItem('balance',money)
},[money])
const addMoney = () =>{
  if(errorNan()){
    alert("Введи число")
  }else {
    const numbersValue = Number(moneyValue)
    setMoney(money+numbersValue)
    setaddOperationMoney([...addoperationmoney,numbersValue])
    setValueMoney('')
  }
  console.log(addoperationmoney)

  
}

const removeMoney = () => {
  const numbersValue = Number(moneyValue)

  if( money-numbersValue < 0){
    alert("Недостаточно средств")
    return
  }else if(errorNan()){
    alert("Введи число")
  }
  else{
    setMoney(money-numbersValue)
    setremoveOperationMoney([...removeoperationmoney,numbersValue])
    setValueMoney("")
  }

}
const errorNan = () =>{
  if(moneyValue === '' || isNaN(Number(moneyValue))){
    return true
  }else{return false}
}
const resetHistory = () =>{
  setaddOperationMoney([])
  setremoveOperationMoney([])
  setMoney(0)

}

const sumPlusMoney = () =>{
  let sum = 0
  for(let i = 0;i < addoperationmoney.length; i++){
    sum += addoperationmoney[i]
  }
  return sum
}
const sumMinusMoney = () =>{
  let sum = 0
  for(let i = 0;i < removeoperationmoney.length; i++){
    sum += removeoperationmoney[i]
  }
  return sum
}



return(

  <div style={{}}>
    <input type="text" value={moneyValue} onChange={(e) => setValueMoney(e.target.value)}/>
    <button onClick={addMoney}>Доход</button>
    <button onClick={removeMoney}>рассход</button>
    <button onClick={resetHistory}>Очистить</button>
      <div style={{display:'flex',justifyContent:'center', gap:"20px"}}>
        <p>Баланс: {money}</p>
        <p >Доход: {sumPlusMoney()}</p>
        <p >Рассход: {sumMinusMoney()}</p>
      </div>
    <div style={{display:'flex',justifyContent:'center',gap:'30px'}}>
      <div >
          {addoperationmoney.map((m,i)=>(
            <div key={i} style={{display:'flex',border:"1px solid green",padding:"10px",width:'100%',maxWidth:"600px"}}>
              <span>{"+" +  m + " рублей"}</span>
            </div>
          )
          )}
      </div>
      <div>
        { removeoperationmoney.map((m,i)=> (
          <div key={i} style={{display:'flex',border:'1px solid red',padding:"10px",width:'100%',maxWidth:"600px"}}>
            <span>{"-" +  m + ' рублей'}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
  
)
}
function App() {
  return(
    <div className='App'>
      <Money/>
    </div>
  )
}

export default App;