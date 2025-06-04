import { useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handling for the example fetch request button:
  const handleButtonFetch = async() => {
    const response = await fetch(`http://localhost:3000/data`); // endpoint should be where your data is
    const data = await response.json(); // selects the data page from the server endpoints!
    console.log(data);
  }

  // handling for the form:
  const handleRegistration = async(event) => {

    event.preventDefaults();
    const submission = {name, email, password};

    const response = await fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: ("content-type: Application/JSON"),
      body: JSON.stringify(submission)// here is where the information we wanna store (also MUST stringify!)
    });

    const result = response.json();
    // if the response was not OK, send a message about the error:
    if (!response.ok) {
      setMessage("There was a problem registering the account!")
    }
    setMessage(result.message);
  }

  return (
    <>
      <div className='m-4 p-3 flex justify-center items-center flex-col'>

          {/* Example Fetch Call */}
          <div className='flex justify-center items-center flex-col'> {/*need "items center" or else the button stretches*/}
            <p className='text-2xl'>Week 5 - FrontEnd Integration</p>
            <button 
              className='p-3 m-5 text-xl cursor-pointer border rounded-full text-white bg-gray-700'
              onClick={handleButtonFetch}
              >Click Me to Fetch!
            </button>
            <div className='m-4 border border-t w-[500px]'></div>
          </div>

        {/* Registration Form */}
        <div className='flex justify-center p-5 m-3 bg-gray-500 rounded-[10px] flex-col shadow-2xl'>
          <form className='flex justify-center flex-col items-center' onSubmit={handleRegistration}>
            <label className='text-white text-2xl'>Register Form:</label>
            <input 
              className='text-white text-[3lvh] border-[2px] p-1 m-2' 
              placeholder='name...'
              type='text' 
              value={name} 
              onChange={(event) => setName(event.target.value)}
            />
            <input 
              className='text-white text-[3lvh] border-[2px] p-1 m-2' 
              placeholder='email...' 
              type='email'
              value={email} 
              onChange={(event) => setEmail(event.target.value)}
            />
            <input 
              className='text-white text-[3lvh] border-[2px] p-1 m-2'
              placeholder='password...'
              type='password'
              value={password} 
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <button className='text-white bg-gray-800 rounded-full mt-4 p-3 cursor-pointer' type='submit'>Submit Form</button>
        </div>

      </div>
    </>
  )
}

export default App;