# it looks like
<img width="674" alt="image" src="https://github.com/user-attachments/assets/24524f8d-1cce-4b50-9c92-5d7477524fa7" />


# the code
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Party {
  name: string;
  votes: number;
  originalName: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function VotingApp() {
  const [parties, setParties] = useState<Party[]>([]);
  const [newPartyName, setNewPartyName] = useState('');

  const addParty = () => {
    if (newPartyName.trim() !== '') {
      setParties([...parties, { name: newPartyName, votes: 0, originalName: newPartyName }]);
      setNewPartyName('');
    }
  };

  const vote = (index: number) => {
    const updatedParties = [...parties];
    updatedParties[index].votes += 1;
    setParties(updatedParties);
  };

  const resetNames = () => {
    const updatedParties = parties.map(party => ({
      ...party,
      name: party.originalName
    }));
    setParties(updatedParties);
  };

  const totalVotes = parties.reduce((sum, party) => sum + party.votes, 0);

  const data = parties.map(party => ({
    name: party.name,
    value: party.votes
  }));

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Voting App</h1>

      {/* Add Party Section */}
      <div className="mb-6 flex space-x-3">
        <input
          type="text"
          placeholder="Enter option name"
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={newPartyName}
          onChange={(e) => setNewPartyName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-full focus:outline-none focus:shadow-outline"
          onClick={addParty}
        >
          Add Option
        </button>
      </div>

      {/* Parties List */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Options:</h2>
        <ul>
          {parties.map((party, index) => (
            <li key={index} className="flex items-center justify-between py-3 border-b border-gray-300">
              <span
                className="text-lg text-gray-800 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                onClick={() => {
                  const newName = prompt('Edit option name:', party.name);
                  if (newName) {
                    const updatedParties = [...parties];
                    updatedParties[index].name = newName;
                    setParties(updatedParties);
                  }
                }}
              >
                {party.name}
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-lg text-gray-700">Votes: {party.votes}</span>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-full focus:outline-none focus:shadow-outline"
                  onClick={() => vote(index)}
                >
                  Vote
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Names Button */}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-5 px-10 rounded-full focus:outline-none focus:shadow-outline mb-6"
        onClick={resetNames}
        disabled={parties.length === 0}
        className={parties.length === 0 ? "bg-red-300 text-white font-bold py-5 px-10 rounded-full focus:outline-none focus:shadow-outline cursor-not-allowed" : "bg-red-500 hover:bg-red-700 text-white font-bold py-5 px-10 rounded-full focus:outline-none focus:shadow-outline mb-6"}
      >
        Reset Names
      </button>

      {/* Pie Chart */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Voting Results:</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {totalVotes === 0 ? <p className="text-gray-600">No votes yet!</p> : <p className="text-lg text-gray-700">Total votes: {totalVotes}</p>}
      </div>
    </div>
  );
}
