import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { addProjects, addProjects1, addProjects2 } from '../ngo/api';

const AdminLogin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showAddService, setShowAddService] = useState(false); 
  const [food,setfood]=useState(false)
  const [edc,setedc]=useState(false)
  const [shel,setshel]=useState(false)
  const adminEmail = 'admin@example.com';
  const adminPassword = '123';

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    if (enteredEmail === adminEmail && enteredPassword === adminPassword) {
      setIsLoggedIn(true); 
    } else {
      setError('Invalid email or password.');
    }
  };
  
  const handleAddServiceClick1 = () => {
    setShowAddService(true); 
    setedc(true);
    setshel(false);
    setfood(false)
  };
  const handleAddServiceClick2 = () => {
    setShowAddService(true); 
    setfood(true);
    setshel(false);
    setedc(false);
  };
  const handleAddServiceClick3 = () => {
    setShowAddService(true); 
    setshel(true);
    setfood(false);
    setedc(false);
  };
  
  const handleCancelClick = () => {
    setShowAddService(false); 
  };
  
  const name = useRef(null);
  const location = useRef(null);
  const description = useRef(null);
  const contact = useRef(null);
  const history = useRef(null);
  const impact = useRef(null);
  const submit = async (e) => {
    e.preventDefault();
    handleCancelClick()
    const project={
      name: name.current.value,
      location: location.current.value,
      description: description.current.value,
      contact: contact.current.value,
      history: history.current.value,
      impact: impact.current.value,
    }
    try{
      if(edc){
      const response=await addProjects(project)
      console.log(response)
      }
      else if(food)
      {
        const response=await addProjects1(project)
      console.log(response)
      }
      else if(shel)
      {
        const response=await addProjects2(project)
      console.log(response)
      }
      }
      catch(error)
      {
          console.log(error)
      }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xl">
        {!isLoggedIn ? (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Enter admin email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                autoComplete="email" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Enter password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                autoComplete="current-password" 
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        ) : !showAddService ? (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-4 text-center">Welcome Admin</h2>
            <p className="mb-6 text-gray-700">
              You are now logged in as an admin. From here, you can manage services, events, and more for your platform.
              To add a new service, click the button below.
            </p>
            <div className="flex gap-10">
            <button
              onClick={handleAddServiceClick1}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Education
            </button>
            <button
              onClick={handleAddServiceClick2}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add food
            </button>
            <button
              onClick={handleAddServiceClick3}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add shelter
            </button>
            </div>
          </div>
        ) : (
          <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={handleCancelClick}>
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" /> {/* Using the X icon */}
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">Add a New Service</h2>
            <form onSubmit={submit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceName">
                  Service Name Title
                </label>
                <input
                  id="serviceName"
                  type="text"
                  ref={name}
                  placeholder="Enter service name title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  autoComplete="off" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  ref={location}
                  placeholder="District, State, Pincode"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  autoComplete="address-level1" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description About the Service
                </label>
                <textarea
                  id="description"
                  ref={description}
                  placeholder="Provide a detailed description of the service"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  required
                  autoComplete="off" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                  Contact (Email)
                </label>
                <input
                  id="contact"
                  ref={contact}
                  type="email"
                  placeholder="Enter email for contact"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  autoComplete="email" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="history">
                  History of the Service
                </label>
                <textarea
                  id="history"
                  ref={history}
                  placeholder="Provide the history of the service"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  required
                  autoComplete="off" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="impact">
                  Impact of the Service
                </label>
                <textarea
                  id="impact"
                  placeholder="Describe the impact of this service"
                  ref={impact}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  required
                  autoComplete="off" 
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit Service
                </button>
              </div>
            </form>
          </div>
        )}
        
        
      </div>
    </div>
  );
};

export default AdminLogin;
