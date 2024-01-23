import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/dash.css";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const [response, setResponse] = useState([]);
  const [besoin, setBesoin] = useState(0);
  const [cofre, setCofre] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expens70, setExpens70] = useState(0);
  const [testRes, setTestRes] = useState("");
  const [colorTest, setColorTest] = useState("");
  const token = localStorage.getItem('token');
  const tokenIsValid = (token) => !!token;
  const navigate = useNavigate();

  useEffect(() => {
    fetchFact();
    const isValidToken = tokenIsValid(token);

    if (!isValidToken) {
      navigate('/');
    }
  }, [token, navigate]);


  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    try {
      const response1 = await axios.get("http://127.0.0.1:9000/facture/totalPayedPrice");
      const response2 = await axios.get("http://127.0.0.1:9000/facture/totalNotPayedPrice");
      const response3 = await axios.get("http://127.0.0.1:9000/facture/expense");
      setCofre(response1.data.totalPayedPrice);
      setBesoin(response2.data.totalNotPayedPrice);
      setExpense(response3.data.expense);
      setExpens70((70 * response3.data.expense) / 100);
    } catch (error) {
      console.log("Error in getting Facturs!", error);
    }
  };

  const testBtn = () => {
    if (besoin > expens70) {
      setTestRes(
        "Financial dues exceeded 70% of the total amount, Critical and bad financial situation."
      );
      setColorTest("red");
      console.log("70% of Expenses money = "+expens70+" || Needed money = "+besoin)
    } else {
      setTestRes(
        "Financial receivables did not exceed 70% of the total amount, Good financial situation."
      );
      setColorTest("green");
      console.log("70% of Expenses money = "+expens70+" || Needed money = "+besoin)
    }
  };

  return (
    <>
      <div className="alldash">
        <Navbar />
        <br />
        <br />
        <br />
        <div className="carddash">
          <h3>Money in cofre:</h3>
          <b>cofre</b>
          <p>{cofre} $</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6693/6693944.png"
            alt="icon"
          />
        </div>
        <div className="carddash">
          <h3>Money not returned:</h3>
          <b>Needed</b>
          <p>{besoin} $</p>
          <img
            src="https://www.spar.ch/fileadmin/user_upload/1_Startseite/_Teaser/SPAR-Home-Teaser-SPAR_Friends-FAQ.png"
            alt="icon"
          />
        </div>
        <div className="carddash">
          <h3>Lost capital :</h3>
          <b>Expense</b>
          <p>{expense} $</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5501/5501371.png"
            alt="icon"
          />
        </div>

        <div className="financialdash">
          <h1>Financial Situation Test:</h1>
          <button className="dashtestbtn" onClick={testBtn}>
            Testing-now
          </button>
          <p className="testR" style={{ color: colorTest }}>
            {testRes}
          </p>
        </div>
      </div>
    </>
  );
};

export default Dash;
