import React from 'react';

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            text : []
        }
    }
    componentDidMount(){
        fetch("/api/data.json").then(respon =>{
            return respon.json()
        }).then(data=>{
            this.setState(
               {
                   text : data
               }
            )
        })
    }

    render(){
        const audio = document.querySelector("audio");
        const content = document.querySelector(".content");
        const data = this.state.text

       setInterval(()=>{
           if (audio && data.length > 0){
                content.innerHTML = "";
                data.forEach(e => {
                    if(audio.currentTime>= e.timeStart){
                        const div = document.createElement("div");
                        div.classList.add("item");
                        const time = document.createElement("p");
                        time.classList.add("time");
                        time.innerHTML = e.timeStart + ' сек.';
                        const p = document.createElement("p")
                        let text = "";
                        e.words.forEach(w=>{
                            if(w.timeStart < audio.currentTime && audio.currentTime < w.timeEnd){
                                text += "<span>"+w.word+"</span> "; 
                            }else{
                                text += w.word +' '; 
                            }
                        })
                        p.innerHTML = text;
                        div.appendChild(time);
                        div.appendChild(p);
                        content.appendChild(div);
                    }else{
                        const div = document.createElement("div");
                        div.classList.add("item");
                        const time = document.createElement("p");
                        time.classList.add("time");
                        time.innerHTML = e.timeStart + ' сек.';
                        const p = document.createElement("p")
                        p.innerHTML = e.phrase;
                        div.appendChild(time);
                        div.appendChild(p);
                        content.appendChild(div);
                    }
                });

           }
           
       }, 100)
       console.log(this.state.text)
        return(
            <div>
                <div className="textContent">
                    <div className="title">
                        <h1>
                            Пример звонка.wav
                        </h1>
                        <p>
                            21 мар 18:03:41
                        </p>
                    </div>
                        <div className="content">
                            {this.state.text.length>0 ?  this.state.text.map((e, index) =>
                                <div className="item" key={index}>
                                    <p>{e.timeStart + ' сек.'}</p>
                                    <p>{e.phrase}</p>
                                </div>): ""}
                        </div>
                </div>
                
            </div>
        )
    }
}

export default App;