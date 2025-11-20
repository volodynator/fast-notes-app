import { useState } from 'react';

import { manager, type Task } from '../../../model';
import { Timer } from './Timer';

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
    setIsRunning(false);
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

  return (
    <div>
      <div>
        <h2>Timer</h2>
        {isRunning && (
          <Timer
            key={timerKey}
            timeToCountdown={timeToCountdownInMins}
            onComplete={handleTimerEnd}
          />
        )}
      </div>

      <div className="form-row form-row--full">
        <label>Choose task to work on</label>
        <select
          value={selectedTask?.title ?? ''}
          onChange={(e) => {
            const title = e.target.value;
            const task = tasks.find((t) => t.title === title);
            setSelectedTask(task);
          }}
          disabled={isRunning}
        >
          <option value="">Please choose one option</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row form-row--full">
        <label>Select Time: {timeToCountdownInMins} min</label>
        <input
          type="number"
          name="time"
          min="1"
          max="50"
          value={timeToCountdownInMins}
          onChange={(e) => setTimeToCountdownInMins(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="form-row form-row--full">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
