const initialData: MusicData[] = [
    // ... (既存のデータはそのまま保持)
  ];

  useEffect(() => {
    document.title = "曲当てクイズ";
  }, []);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicData, setMusicData] = useState<MusicData[]>(initialData);

  const handleNext = () => {
    setShowAnswer(false);
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicData.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? musicData.length - 1 : prevIndex - 1
    );
  };

  function shuffleList(list: MusicData[]) {
    return list
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  const handleShuffle = () => {
    setShowAnswer(false);
    setIsPlaying(false);
    setMusicData(shuffleList([...musicData]));
    setCurrentSongIndex(0);
  };

  useEffect(() => {
    setMusicData(shuffleList(initialData));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          曲当てクイズ
        </h1>
        
        <div className="mb-8">
          <div className="flex flex-col items-center mb-6">
            <p className="text-lg text-gray-600 mb-4">
              {showAnswer ? "正解" : "曲を聴いて曲名を当ててみましょう"}
            </p>
            
            <div className="w-full max-w-md bg-indigo-50 rounded-lg p-4 mb-4">
              <audio
                className="w-full"
                src={`${musicData[currentSongIndex].filename}.mp3`}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                ← 前の問題
              </button>
              
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showAnswer
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                {showAnswer ? "正解を隠す" : "正解を表示"}
              </button>
              
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                次の問題 →
              </button>
            </div>
            
            <button
              onClick={handleShuffle}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              問題をシャッフル
            </button>
          </div>
          
          {showAnswer && (
            <div className="bg-indigo-50 rounded-xl p-6 transition-all">
              <div className="text-2xl font-semibold text-indigo-800 mb-4">
                {musicData[currentSongIndex].title}
              </div>
              <div className="flex justify-center">
                <Image
                  src={`${musicData[currentSongIndex].filename}.svg`}
                  alt="music sheet"
                  width={800}
                  height={200}
                  className="rounded-lg shadow"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          問題 {currentSongIndex + 1} / {musicData.length}
        </div>
      </div>
    </div>
  );
}