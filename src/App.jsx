import React, { useState } from "react";

function App(){

  const[pincode,SetPincode] = useState("")
  const[details,SetDetails] = useState(null)
  const[error,SetError] = useState("")

  const fetchPincodeDetails = async () =>{
    SetError("")
    SetDetails(null)

    if(!/^\d{6}$/.test(pincode)){
      SetError('Please enter a valid 6-digit pincode')
      return
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()

      if(data[0].Status === "Success" && data[0].PostOffice.length > 0){
        SetDetails(data[0].PostOffice)
      }
      else{
        SetError('No details found for this pincode.')
      }
    } 
    catch (err){
      console.error('Error fetching pincode details :',err);
      SetError('An error occured while fetching data. Please try again later.')

    }
  };

  const handleInputChange = (event) =>{
    SetPincode(event.target.value)
  };

  return (
    <div className="container">
      <h1>Pincode Lookup</h1>
      <input type="text" value={pincode} onChange={handleInputChange} placeholder="Enter 6-digit pincode" maxLength={6}/>
      <button onClick={fetchPincodeDetails}>LookUp</button>
      {error && <p className="error">{error}</p>}

      {details && (
        details.map(item => 
            <div className="results">
              <p><strong>Post Office Name:</strong>{item.Name}</p>
              <p><strong>Pincode:</strong>{item.Pincode}</p>
              <p><strong>District:</strong>{item.District}</p>
              <p><strong>State:</strong>{item.State}</p>
            </div>
        )
      )}
    </div>
  );
}

export default App;
