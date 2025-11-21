import { useState } from 'react';

import { manager, type Task } from '../../../model';
import { Timer } from './Timer';
import { CirclePlay, CircleStop, RotateCcw } from 'lucide-react';

interface TimerManagerProps {
  tasks: Task[];
  onTimerEnded: () => void;
}

export function TimerManager({ tasks, onTimerEnded }: TimerManagerProps) {
  const [timeToCountdownInMins, setTimeToCountdownInMins] = useState(5);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const handleStart = () => {
    if (timeToCountdownInMins > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(true);
    setTimerKey((prev) => prev + 1);
  };

  const handleTimerEnd = async () => {
    setIsRunning(false);
    if (selectedTask) {
      console.log(`Time spent ${timeToCountdownInMins}`);
      console.log(`Old value ${selectedTask.timeSpent}`);
      const newTimeSpent = selectedTask.timeSpent + timeToCountdownInMins;
      selectedTask.timeSpent = newTimeSpent;
      await manager.updateTask(selectedTask?.id, selectedTask);
      console.log(`New value ${selectedTask.timeSpent}`);
    }
    onTimerEnded();
  };

  function runningTimer() {
    return (
      <div className="running-timer">
        <Timer
          key={timerKey}
          timeToCountdown={timeToCountdownInMins}
          onComplete={handleTimerEnd}
        />
        <div className="timer-controls">
          <button onClick={handleStop}>
            <CircleStop height={'20px'} />
          </button>
          <button onClick={handleReset}>
            <RotateCcw height={'20px'} />
          </button>
        </div>
      </div>
    );
  }

  function stoppedTimer() {
    return (
      <div className="stopped-timer">
        <div className="stopped-timer-task">
          <input
            type="number"
            name="time"
            min="1"
            max="50"
            value={timeToCountdownInMins}
            onChange={(e) => setTimeToCountdownInMins(Number(e.target.value))}
            disabled={isRunning}
          />
          <div>mins</div>
          <select
            value={selectedTask?.title ?? ''}
            onChange={(e) => {
              const title = e.target.value;
              const task = tasks.find((t) => t.title === title);
              setSelectedTask(task);
            }}
            disabled={isRunning}
          >
            <option value="">select task</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="timer-controls">
          <button onClick={handleStart}>
            <CirclePlay height={'20px'} />
          </button>
        </div>
      </div>
    );
  }

  return isRunning ? runningTimer() : stoppedTimer();
}
