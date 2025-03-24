import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChromePicker } from 'react-color';

type Language = 'en' | 'zh' | 'fr' | 'ja';

const translations = {
  en: {
    title: 'Vote Counter',
    vote: 'Vote',
    totalVotes: 'Total Votes:',
    reset: 'Reset',
    currentResults: 'Current Results',
    customize: 'Click on the labels above to customize them',
    resetName: 'Reset Name',
    changeColor: 'Change Color',
  },
  zh: {
    title: '投票计数器',
    vote: '投票',
    totalVotes: '总票数:',
    reset: '重置',
    currentResults: '当前结果',
    customize: '点击上方标签进行自定义',
    resetName: '重置名称',
    changeColor: '更改颜色',
  },
  fr: {
    title: 'Compteur de Votes',
    vote: 'Voter',
    totalVotes: 'Total des Votes:',
    reset: 'Réinitialiser',
    currentResults: 'Résultats Actuels',
    customize: 'Cliquez sur les étiquettes ci-dessus pour les personnaliser',
    resetName: 'Réinitialiser le nom',
    changeColor: 'Changer la couleur',
  },
  ja: {
    title: '投票カウンター',
    vote: '投票',
    totalVotes: '総投票数:',
    reset: 'リセット',
    currentResults: '現在の結果',
    customize: '上のラベルをクリックしてカスタマイズしてください',
    resetName: '名前をリセット',
    changeColor: '色を変更',
  },
};

const VoteCounter = () => {
  const [blueVotes, setBlueVotes] = useState(0);
  const [redVotes, setRedVotes] = useState(0);
  const [lastVote, setLastVote] = useState<'blue' | 'red' | null>(null);
  const [blueLabel, setBlueLabel] = useState('Blue');
  const [redLabel, setRedLabel] = useState('Red');
  const [editingBlue, setEditingBlue] = useState(false);
  const [editingRed, setEditingRed] = useState(false);
  const [blueColor, setBlueColor] = useState('#3b82f6');
  const [redColor, setRedColor] = useState('#ef4444');
  const [showBluePicker, setShowBluePicker] = useState(false);
  const [showRedPicker, setShowRedPicker] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

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

  const handleResetBlueLabel = () => {
    setBlueLabel('Blue');
  };

  const handleResetRedLabel = () => {
    setRedLabel('Red');
  };

  const totalVotes = blueVotes + redVotes;
  const bluePercentage = totalVotes > 0 ? (blueVotes / totalVotes) * 100 : 50;
  const redPercentage = totalVotes > 0 ? (redVotes / totalVotes) * 100 : 50;

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <div className="flex justify-end w-full max-w-2xl mb-4 relative z-20">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {language.toUpperCase()}
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-1 py-1 ">
                {['en', 'zh', 'fr', 'ja'].map((lang) => (
                  <Menu.Item key={lang}>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => setLanguage(lang as Language)}
                      >
                        {lang.toUpperCase()}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t.title}</h1>

      <div className="w-full max-w-2xl p-6">
        <div className="flex justify-between mb-4">
          <div className="text-gray-800 font-bold text-xl flex items-center">
            {editingBlue ? (
              <input
                type="text"
                value={blueLabel}
                onChange={handleBlueLabelChange}
                onBlur={() => setEditingBlue(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingBlue(false)}
                className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                autoFocus
              />
            ) : (
              <span onClick={() => setEditingBlue(true)} className="cursor-pointer hover:underline mr-2">
                {blueLabel}
              </span>
            )}
            <div className="relative z-10">
              <button onClick={() => setShowBluePicker(!showBluePicker)} className="w-8 h-8 rounded mr-2" style={{ backgroundColor: blueColor }}></button>
              {showBluePicker && (
                <div className="absolute z-20">
                  <div className="absolute top-0 left-0 w-full h-full" onClick={() => setShowBluePicker(false)} />
                  <ChromePicker color={blueColor} onChangeComplete={(color) => setBlueColor(color.hex)} />
                </div>
              )}
            </div>
            <button onClick={handleResetBlueLabel} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-2 rounded transition-colors duration-300">
              {t.resetName}
            </button>
          </div>
          <div className="text-gray-800 font-bold text-xl flex items-center">
            {editingRed ? (
              <input
                type="text"
                value={redLabel}
                onChange={handleRedLabelChange}
                onBlur={() => setEditingRed(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingRed(false)}
                className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                autoFocus
              />
            ) : (
              <span onClick={() => setEditingRed(true)} className="cursor-pointer hover:underline mr-2">
                {redLabel}
              </span>
            )}
            <div className="relative z-10">
              <button onClick={() => setShowRedPicker(!showRedPicker)} className="w-8 h-8 rounded mr-2" style={{ backgroundColor: redColor }}></button>
              {showRedPicker && (
                <div className="absolute z-20">
                  <div className="absolute top-0 left-0 w-full h-full" onClick={() => setShowRedPicker(false)} />
                  <ChromePicker color={redColor} onChangeComplete={(color) => setRedColor(color.hex)} />
                </div>
              )}
            </div>
            <button onClick={handleResetRedLabel} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-2 rounded transition-colors duration-300">
              {t.resetName}
            </button>
          </div>
        </div>

        <div className="flex h-64 mb-6 rounded-lg overflow-hidden">
          <div
            className="transition-all duration-300 flex items-center justify-center cursor-pointer"
            style={{ width: `${bluePercentage}%`, backgroundColor: blueColor }}
            onClick={handleBlueVote}
          >
            {blueVotes > 0 && (
              <div className={`text-white font-bold text-4xl mb-2 transition-opacity duration-300 ${lastVote === 'blue' ? 'animate-pulse' : ''}`}>
                {blueVotes}
              </div>
            )}
          </div>
          <div
            className="transition-all duration-300 flex items-center justify-center cursor-pointer"
            style={{ width: `${redPercentage}%`, backgroundColor: redColor }}
            onClick={handleRedVote}
          >
            {redVotes > 0 && (
              <div className={`text-white font-bold text-4xl mb-2 transition-opacity duration-300 ${lastVote === 'red' ? 'animate-pulse' : ''}`}>
                {redVotes}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBlueVote}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: blueColor }}
          >
            {t.vote} {blueLabel}
          </button>

          <div className="flex flex-col items-center">
            <div className="text-gray-700 font-medium mb-2">
              {t.totalVotes} {totalVotes}
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {t.reset}
            </button>
          </div>

          <button
            onClick={handleRedVote}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: redColor }}
          >
            {t.vote} {redLabel}
          </button>
        </div>
      </div>

      {totalVotes > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.currentResults}</h2>
          <div className="flex gap-4 justify-center">
            {blueVotes > 0 && (
              <div style={{ color: blueColor }}>
                {blueLabel}: {bluePercentage.toFixed(1)}%
              </div>
            )}
            {redVotes > 0 && (
              <div style={{ color: redColor }}>
                {redLabel}: {redPercentage.toFixed(1)}%
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>{t.customize}</p>
      </div>
    </div>
  );
};

export default VoteCounter;