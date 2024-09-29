"use client";
import React, { useState } from "react";

// 曲データのサンプル
const songs = [
  {
    title: "旅笠道中",
    audio: "旅笠道中.mp3",
    answer: "旅笠道中(よるがつめたいこころがさむい 歌謡曲 1935 東海林太郎)",
  },
  {
    title: "露営の歌",
    audio: "露営の歌.mp3",
    answer: "露営の歌(ゆりかごのうたをかなりやがうたうよねんねこ 童謡・唱歌)",
  },
];

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const playSong = () => {
    const audio = new Audio(songs[currentSongIndex].audio);
    audio.play();
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  return (
    <div>
      <h1>曲クイズ</h1>
      <h2 className="text-2xl">{songs[currentSongIndex].title}</h2>

      {/* <button className="text-2xl border  border-teal-300" onClick={playSong}>
        曲を流す
      </button> */}

      <audio
        className="w-[80%]"
        src={songs[currentSongIndex].audio}
        // src={`${BASE_PATH}/${music.filename}.mp3`}
        controls
      ></audio>

      <p></p>
      <button onClick={() => setShowAnswer(true)}>正解を表示</button>
      <p className=""></p>
      {showAnswer && <p>正解: {songs[currentSongIndex].answer}</p>}
      <p className=""></p>
      <button onClick={handleNext}>次の問題に行く</button>
    </div>
  );
}
