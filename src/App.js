import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [characters, setCharacters] = useState([]);
    const [userInput, setUserInput] = useState("");
    let apiKey = "575a5f4a9ec2baa1520842ebde88092e"; //public key
    let hash = "f221b96b02b9c4d1bf51561f721c62e0"; // hashed using MD5 algorithm with combination of public and private key

    // changes the input value when user enter a value
    const onChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    //  maps the retrieved characters
    const listItems = characters.slice(0, 5).map((number, key) => (
        <ul key={key} className="options">
            <li>{number.name}</li>
        </ul>
    ));

    // A new request has created to be used later
    const request = new Request(
        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}&nameStartsWith=${userInput}`,
        {
            method: "GET",
            headers: {
                Accept: "*/*",
            },
        }
    );

    // the above request is used to request data from marvels restfull api
    // the use effect hook aupdates everytime a change is made to userInput usestate
    useEffect(() => {
        console.log(userInput);
        if (userInput === "") {
            setCharacters([""]);
        } else {
            fetch(request)
                .then((response) => response.json())
                .then((user) => {
                    console.log(user.data.results);
                    setCharacters(user.data.results);
                })
                .then((response) => {
                    console.debug(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userInput]);

    return (
        <div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search Terms "
                    className="search-box"
                    onChange={onChange}
                />
                <input type="submit" value="search" className="search-btn" />
            </div>
            {listItems}
        </div>
    );
}

export default App;
