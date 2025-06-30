import { useRouter } from 'next/router';
import { useState } from "react";
import Image from 'next/image';

export default function LogInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    alert(`Username: ${username}`);
    alert(`Email: ${email}`);
    alert(`Password: ${password}`);
  };

  const BookingClickHandler = (e) => {
    e.preventDefault();
    router.push('/');
}

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/background5.png')" }}>
        <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleLogin}
            className="bg-gray-900 border-2 border-gray-700 rounded-2xl w-[400px] h-[600px] flex flex-col justify-center px-8 shadow-lg">
            <div className="flex justify-center mb-6">
                <Image src="/elkexpeditionlogo.png" alt="Elk Expedition Logo" className="website-logo cursor-pointer" onClick={BookingClickHandler} width={100} height={100}/>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-cream hunterra text-gray-400">
              Login
            </h2>

            <label className="hunterra mb-2 text-cream text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 text-cream"
              required
            />

            <label className="hunterra mb-2 text-cream text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 text-cream"
              required
            />

            <label className="hunterra mb-2 text-cream text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 text-cream"
              required
            />

            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-md font-semibold"
            >
              Log In
            </button>
            <div className='flex justify-center mt-5 flex-col text-center'>
                <a className='link-hover text-[13.5px] text-blue-500 cursor-pointer m-2'>Don't have an Account? Sign-up for Free!</a>
                <a className='link-hover text-[11.5px] text-blue-200 cursor-pointer'>Forgot Password? Click Here!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}