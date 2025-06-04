import { use, useState } from 'react'
import './App.css'

function App() {

  const [singleFile, setSingleFile] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);
  const [displayMessage, setDisplayMessage] = useState("");

  const fetchSingleFile = async() => {

    try {
    const response = await fetch(`http://localhost:3000/fetch/single`);
    const data = await response.blob();
    const imageURL = URL.createObjectURL(data); // convert data to usable URL on the frontend
    setDisplayFile(imageURL);
      
    } catch (error) {
      setDisplayMessage("There was an Issue with your Request...");
      console.log(error);
    }
  }

  const saveSingleFile = async(event) => {
    event.preventDefaults();

    try {
      const newFormData = new FormData();
      newFormData.append('file', singleFile);
      const response = await fetch(`http://localhost:3000/save/single`, {
        method: "POST",
        body: IMAGEDATA
      });

      if (!response.ok) {
        setDisplayMessage("File Upload: FAILURE!");
        return;
      }
      setDisplayMessage("File Upload: SUCCESS!");

    } catch (error) {
      setDisplayMessage("There was an Issue Uploading your File!");
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex justify-center p-1 m-4 flex-col items-center'>
          <p className='text-4xl mb-3'>Lab 3</p>
          <div className='m-4 border border-t w-[600px]'></div>

          {/* File Dropper */}
          <form onSubmit={saveSingleFile} className='flex justify-center flex-col items-center m-5'>
            <div className='fileInputBox border-3 border-dotted p-5 m-3 h-[50lvh] w-[80lvh] rounded-xl flex justify-center items-center'>
              {/* <p className='text-gray-400'>Drop Files Here</p> */}
              <input
              className='text-gray-400'
              type='file'
              onChange={(e) => {setSingleFile(e.target.files[0])}}
            />
            </div>
            <button type='submit' className='rounded-3xl bg-gray-300 p-3 shadow-2xl cursor-pointer'>Upload File(s)</button>
          </form>
          <button onClick={fetchSingleFile} className='rounded-3xl bg-gray-600 p-3 shadow-2xl text-2xl text-white cursor-pointer'>Fetch a File</button>
          {displayFile}

        </div>
      </div>
    </>
  )
}

export default App