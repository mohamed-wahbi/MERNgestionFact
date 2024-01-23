import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/home.css'
import Navbar from './NavBar';


const Home = () => {
  const [fact, setFact] = useState([]);
  const [idSelected, setIdSelected] = useState(null);
  const [msg,setMsg]= useState ("")

    //token :****************************************************************
  const token = localStorage.getItem('token');
  const tokenIsValid = (token) => !!token;
  const navigate = useNavigate();


  useEffect(() => {
    fetchFact();
    const isValidToken = tokenIsValid(token);
    if (!isValidToken) {
      navigate('/');
    }
  }, [token]);
  const userEmail = token ? JSON.parse(atob(token.split('.')[1])).email : null;
  // *************************************************************************

  const [dataForm, setDataForm] = useState({
    fournisseur: userEmail,
    client: '',
    tot_price: null,
    payed_price: null,
    not_payed_price: null,
    isPayed: '',
  });

  useEffect(()=>{
    calcNotPayPrc()
  },[dataForm.tot_price,dataForm.payed_price])

    const calcNotPayPrc = ()=>{
      console.log(dataForm.tot_price-dataForm.payed_price)
      setDataForm(prev=>({
        ...prev,
        not_payed_price:dataForm.tot_price - dataForm.payed_price
      }))
      console.log(dataForm.tot_price-dataForm.payed_price===0)
      console.clear(dataForm.fournisseur)
      if(dataForm.tot_price-dataForm.payed_price===0){
        setDataForm(prev=>({
          ...prev,
          isPayed : "true"
        }))
      }else{
        setDataForm(prev=>({
          ...prev,
          isPayed : "false"
        }))
      }
    }

  const fetchFact = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:9000/facture/getFact');
      setFact(response.data);
    } catch (error) {
      console.log('Error in getting Facturs !', error);
    }
  };

  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:9000/facture/deleteFact/${id}`);
      fetchFact();
      console.log('One facture is deleted.');
    } catch (error) {
      console.log('Error in deleting Factur!', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    calcNotPayPrc()
    try {
      if (idSelected) {
        await handleUpdate(idSelected);
      } else {
        await axios.post('http://127.0.0.1:9000/facture/addFact', dataForm);
      }
      fetchFact();
      setIdSelected(null);
      setDataForm({
        fournisseur: userEmail,
        client: '',
        tot_price: '',
        payed_price: '',
        not_payed_price: '',
        isPayed: '',
      });
    } catch (error) {
      console.log('Error in adding or updating factur!', error);
    }
    
    
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:9000/facture/updateFact/${id}`, dataForm);
      fetchFact();
      setIdSelected(null);
      setDataForm({
        fournisseur: userEmail,
        client: '',
        tot_price: '',
        payed_price: '',
        not_payed_price: '',
        isPayed: '',
      });
    } catch (error) {
      console.log('Error in updating factur!', error);
    }
  };

  const handleEdit = (id) => {
    const selectedFact = fact.find((f) => f._id === id);
    setDataForm({
      fournisseur: selectedFact.fournisseur,
      client: selectedFact.client,
      tot_price: selectedFact.tot_price,
      payed_price: selectedFact.payed_price,
      not_payed_price: selectedFact.not_payed_price,
      isPayed: selectedFact.isPayed,
    });

    setIdSelected(id);
  };

  return (
    <div>
      {token ? (
        <div className='all'>
          <Navbar/>
          <h2 className='title'>Welcome to the Home Page</h2>
          <form onSubmit={handleSubmit} className='form'>
            <div className='input'>
              <label>Fournisseur_Email :</label>
              <input
                type='email'
                name='fournisseur'
                value={dataForm.fournisseur}
                readOnly
                required
               />
            </div>

            <div className='input'>
              <label>Client :</label>
              <input
                type='text'
                name='client'
                value={dataForm.client}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='input'>
              <label>Tot_Price :</label>
              <input
                type='number'
                name='tot_price'
                value={dataForm.tot_price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='input'>
              <label>Payed_Price :</label>
              <input
                type='number'
                name='payed_price'
                value={dataForm.payed_price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='input'>
              <label>Not_Payed_Price :</label>
              <input
                type='number'
                name='not_payed_price'
                value={dataForm.not_payed_price}
                readOnly
                required
              />
            </div>

            <div className='input'>
              <label>Is_Payed :</label>
              <div>
                <input
                  type='text'
                  name='isPayed'
                  value={dataForm.isPayed}
                  readOnly
                  required
                />
              </div>
            </div>
              <p style={{color:'red'}}>{msg}</p>
            <button type='submit' className='addBtn'>
              {idSelected ? 'Update-Facture' : 'Add-Facture'}
            </button>
          </form>

          <table border={2} className='table'>
            <thead>
              <tr>
                <td>Fournisseur_Email</td>
                <td>Client</td>
                <td>Tot_Price</td>
                <td>Payed_Price</td>
                <td>Not_Payed_Price</td>
                <td>Is_Payed</td>
                <td>Created_At</td>
                <td>Controls</td>
              </tr>
            </thead>
            <tbody>
              {fact.map((f) => (
                <tr key={f._id}>
                  <td>{f.fournisseur}</td>
                  <td>{f.client}</td>
                  <td>{f.tot_price}$</td>
                  <td>{f.payed_price}$</td>
                  <td>{f.not_payed_price}$</td>
                  <td>{JSON.stringify(f.isPayed)}</td>
                  <td>{f.createdAt}</td>
                  <td>
                    <button onClick={() => handleEdit(f._id)}>UPDATE</button>
                    <button onClick={() => handleDelete(f._id)}>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br/><br/><br/>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
