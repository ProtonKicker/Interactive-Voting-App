import { useState } from 'react';

export default function VotingGame() {
  const [votes, setVotes] = useState({
    fled: 0,
    stay: 0
  });
  const [showFinalResult, setShowFinalResult] = useState(false);

  const handleVote = (choice: 'fled' | 'stay') => {
    setVotes(prev => ({
      ...prev,
      [choice]: prev[choice] + 1
    }));
  };

  const handleShowResult = () => {
    setShowFinalResult(true);
  };

  const resetGame = () => {
    setVotes({ fled: 0, stay: 0 });
    setShowFinalResult(false);
  };

  const backgroundColor = !showFinalResult 
    ? 'bg-gray-100' 
    : votes.fled > votes.stay 
      ? 'bg-red-500' 
      : 'bg-black';

  return (
    <div className={`min-h-screen ${backgroundColor} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {showFinalResult ? 'Final Results' : 'Cast Your Vote'}
          </h1>
          
          <div className="space-y-6">
            {/* Current Vote Counts */}
            <div className="text-center space-y-2 mb-8">
              <div className="flex justify-between px-8 text-xl">
                <span>Fled:</span>
                <span className="font-bold text-red-500">{votes.fled}</span>
              </div>
              <div className="flex justify-between px-8 text-xl">
                <span>Stay:</span>
                <span className="font-bold text-gray-800">{votes.stay}</span>
              </div>
              <div className="flex justify-between px-8 text-xl border-t border-gray-200 mt-4 pt-4">
                <span>Total Votes:</span>
                <span className="font-bold">{votes.fled + votes.stay}</span>
              </div>
            </div>

            {!showFinalResult ? (
              <>
                {/* Voting Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => handleVote('fled')}
                    className="px-8 py-4 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white text-lg"
                  >
                    FLED
                  </button>
                  
                  <button
                    onClick={() => handleVote('stay')}
                    className="px-8 py-4 rounded-lg font-semibold bg-gray-800 hover:bg-gray-900 text-white text-lg"
                  >
                    STAY
                  </button>
                </div>

                {/* Show Results Button */}
                <button
                  onClick={handleShowResult}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg"
                >
                  Show Final Results
                </button>
              </>
            ) : (
              <>
                {/* Winner Announcement */}
                <div className="text-center mb-8">
                  <p className="text-2xl font-bold">
                    {votes.fled > votes.stay 
                      ? 'FLED WINS!' 
                      : votes.stay > votes.fled 
                        ? 'STAY WINS!' 
                        : "IT'S A TIE!"}
                  </p>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetGame}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg"
                >
                  Start New Vote
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}