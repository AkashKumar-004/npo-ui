import pro from '../assets/img/akupi.jpg';
import React, { useEffect, useState } from 'react';
import { addProjects4, getProjects4 } from '../ngo/api';

const Donation = () => {
    const [amount, setAmount] = useState('');
    const [visible, setVisible] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newdonation, setdonation] = useState({ name: '', phone: '', email: '', upiid: '' });
    const [currentdonation, setCurdonation] = useState([]);

    const handleAdddonation = async () => {
        try {
            const response = await addProjects4(newdonation);
            console.log(response);
            setVisible(false);
            setSuccessMessage('Donation added successfully!');
            donationnew();
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to add donation.');
        }
    };

    const donationnew = async () => {
        try {
            const { data } = await getProjects4();
            setCurdonation(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        donationnew();
    }, []);

    const handleDonateClick = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setShowHistory(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleHistoryClick = () => {
        setShowHistory((prev) => !prev);
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center relative"
            style={{
                backgroundImage: 'url("https://i.pinimg.com/736x/75/a8/a6/75a8a6baf1eacdb72dabf731bf00bf5e.jpg")',
            }}
        >
            <h2 className="text-4xl font-bold mb-6 text-center text-white"></h2>

            <div className="text-center mb-6 text-lg text-white max-w-3xl bg-black bg-opacity-50 p-6 rounded-md">
                <p>
                    Your support helps us continue our mission. You can donate by scanning the UPI QR code below. Every contribution brings us closer to our goals.
                </p>
            </div>

            <button
                onClick={handleDonateClick}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors duration-300"
            >
                Donate Now
            </button>

            <div className="absolute bottom-4 right-4">
                <button
                    onClick={handleHistoryClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                    Donation History
                </button>
            </div>

            {successMessage && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-md w-full max-w-md text-center">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="fixed top-5 right-5 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md w-full max-w-xs">
                    {errorMessage}
                </div>
            )}

            {visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 max-w-lg mx-auto relative overflow-y-auto max-h-[90vh] w-[90%]">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h3 className="text-2xl font-bold mb-4 text-center">Donate Using UPI</h3>
                        <div className="text-center">
                            <p className="mb-4 text-gray-700">Scan the QR code below to donate using UPI:</p>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={pro}
                                    alt="UPI QR Code"
                                    className="w-64 h-64"
                                />
                            </div>
                            <p className="text-gray-600 mb-4">UPI ID: akashanand9790-1@oksbi</p>
                            <form onSubmit={handleAdddonation} className="space-y-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setdonation({ ...newdonation, name: e.target.value })}
                                        value={newdonation.name}
                                        required
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-green-400"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        onChange={(e) => setdonation({ ...newdonation, email: e.target.value })}
                                        value={newdonation.email}
                                        required
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-green-400"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Phone Number:</label>
                                    <input
                                        type="tel"
                                        onChange={(e) => setdonation({ ...newdonation, phone: e.target.value })}
                                        value={newdonation.phone}
                                        required
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-green-400"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Your UPI ID (optional):</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setdonation({ ...newdonation, upiid: e.target.value })}
                                        value={newdonation.upiid}
                                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-green-400"
                                        placeholder="your-upi-id@bank"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 w-full"
                                >
                                    Submit Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showHistory && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 w-[60%] mx-auto relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h3 className="text-2xl font-bold mb-4 text-center">Donation History</h3>
                        <div className="text-center">
                            <p className="mb-4 text-gray-700">Here is your donation history:</p>
                            <div className="flex flex-col space-y-4">
                                {currentdonation.map((donation, index) => (
                                    <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-md shadow-sm">
                                        <div>Name: {donation.name}</div>
                                        <div>Email: {donation.email}</div>
                                        <div>Phone: {donation.phone}</div>
                                        <div>UPI ID: {donation.upiid}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donation;
