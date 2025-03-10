import { useState } from 'react';

const VoteCounter = () => {
  const [blueVotes, setBlueVotes] = useState(0);
  const [redVotes, setRedVotes] = useState(0);
  const [lastVote, setLastVote] = useState<'blue' | 'red' | null>(null);
  const [blueLabel, setBlueLabel] = useState('Blue');
  const [redLabel, setRedLabel] = useState('Red');
  const [editingBlue, setEditingBlue] = useState(false);
  const [editingRed, setEditingRed] = useState(false);

  const handleBlueVote = () => {
    setBlueVotes(blueVotes + 1);
    setLastVote('blue');
  };

  const handleRedVote = () => {
    setRedVotes(redVotes + 1);
    setLastVote('red');
  };

  const handleReset = () => {
    setBlueVotes(0);
    setRedVotes(0);
    setLastVote(null);
  };

  const handleBlueLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueLabel(e.target.value);
  };

  const handleRedLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedLabel(e.target.value);
  };

  const totalVotes = blueVotes + redVotes;
  const bluePercentage = totalVotes > 0 ? (blueVotes / totalVotes) * 100 : 50;
  const redPercentage = totalVotes > 0 ? (redVotes / totalVotes) * 100 : 50;

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Vote Counter</h1>
      
      <div className="w-full max-w-2xl p-6">
        <div className="flex justify-between mb-4">
          <div className="text-blue-600 font-bold text-xl">
            {editingBlue ? (
              <input
                type="text"
                value={blueLabel}
                onChange={handleBlueLabelChange}
                onBlur={() => setEditingBlue(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingBlue(false)}
                className="border border-blue-300 rounded px-2 py-1 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <span onClick={() => setEditingBlue(true)} className="cursor-pointer hover:underline">
                {blueLabel}: {blueVotes}
              </span>
            )}
          </div>
          <div className="text-red-600 font-bold text-xl">
            {editingRed ? (
              <input
                type="text"
                value={redLabel}
                onChange={handleRedLabelChange}
                onBlur={() => setEditingRed(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingRed(false)}
                className="border border-red-300 rounded px-2 py-1 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
            ) : (
              <span onClick={() => setEditingRed(true)} className="cursor-pointer hover:underline">
                {redLabel}: {redVotes}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex h-64 mb-6 rounded-lg overflow-hidden">
          <div 
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 flex items-end justify-center cursor-pointer"
            style={{ width: `${bluePercentage}%` }}
            onClick={handleBlueVote}
          >
            <div className={`text-white font-bold text-lg mb-2 transition-opacity duration-300 ${lastVote === 'blue' ? 'animate-pulse' : ''}`}>
              {blueVotes}
            </div>
          </div>
          <div 
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 flex items-end justify-center cursor-pointer"
            style={{ width: `${redPercentage}%` }}
            onClick={handleRedVote}
          >
            <div className={`text-white font-bold text-lg mb-2 transition-opacity duration-300 ${lastVote === 'red' ? 'animate-pulse' : ''}`}>
              {redVotes}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBlueVote}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Vote {blueLabel}
          </button>
          
          <div className="flex flex-col items-center">
            <div className="text-gray-700 font-medium mb-2">
              Total Votes: {totalVotes}
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
          
          <button 
            onClick={handleRedVote}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Vote {redLabel}
          </button>
        </div>
      </div>
      
      {totalVotes > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Current Results</h2>
          <div className="flex gap-4 justify-center">
            <div className="text-blue-600">
              {blueLabel}: {bluePercentage.toFixed(1)}%
            </div>
            <div className="text-red-600">
              {redLabel}: {redPercentage.toFixed(1)}%
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Click on the labels above to customize them</p>
      </div>
    </div>
  );
};

export default VoteCounter;
