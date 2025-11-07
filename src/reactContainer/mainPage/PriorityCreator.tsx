import { manager, type Priority } from '../../model';
import { useState } from 'react';

export function PriorityCreator({
  onPriorityAdded,
}: {
  onPriorityAdded: () => void;
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>('#000000');

  async function addPriority() {
    try {
      const newPriority = {
        name: name,
        color: color,
      } as Priority;

      manager.createPriority(newPriority);

      setName('');
      setColor('#000000');
      onPriorityAdded();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Color:
      <input
        type="color"
        value={color}
        onChange={(ev) => setColor(ev.target.value)}
      />
      <button onClick={addPriority}>Add</button>
    </>
  );
}
