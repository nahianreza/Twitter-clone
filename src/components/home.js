import React, {Component} from 'react';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: "",
        };
    }
    componentDidMount() {
        fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers : {
        "Content-Type" : "application/json",
        Accept : "application/json",
        "Access-Control-Allow-Origin" : "*",

      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),

    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userData");
        this.setState({
                    userData: data.data,
                });
      });
    }

    logOut =() => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

    render() {
        return (
            <div>
                <button onClick={this.logOut} className="btn btn-primary">Log Out</button>
            </div>
        )
    }
}