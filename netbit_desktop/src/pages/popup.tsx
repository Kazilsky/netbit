import { FC, useState } from "react";

export const PopupPage: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("Track Name");
  const [trackDuration, setTrackDuration] = useState("3:45");
  const [userRole, setUserRole] = useState("user"); // Возможные роли: "user", "moderator", "admin"

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Логика для воспроизведения/паузы музыки
  };

  const skipTrack = () => {
    // Логика для пропуска трека
    setCurrentTrack("Next Track");
  };

  const addTrackToQueue = () => {
    if (userRole === "admin" || userRole === "moderator") {
      // Логика для добавления трека в очередь
      alert("Трек добавлен в очередь!");
    } else {
      alert("Недостаточно прав для добавления треков.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-sm w-full mx-auto text-white">
      <h2 className="text-lg font-semibold mb-2">Сейчас играет: {currentTrack}</h2>
      <p className="text-sm text-gray-400 mb-4">Время до конца: {trackDuration}</p>
      <div className="flex gap-2 mb-4">
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300"
        >
          {isPlaying ? "Пауза" : "Воспроизведение"}
        </button>
        <button
          onClick={skipTrack}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
        >
          Следующий трек
        </button>
        {userRole !== "user" && (
          <button
            onClick={addTrackToQueue}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition duration-300"
          >
            Добавить трек
          </button>
        )}
        {userRole === "admin" && (
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition duration-300">
            Загрузить новый трек
          </button>
        )}
      </div>
    </div>
  );
};
