import { useState } from 'react';

interface UseToggleOptions {
  onLabel?: string;
  offLabel?: string;
}

export function useToggle(defaultValue = true, options: UseToggleOptions = {}) {
  const { onLabel = 'ON', offLabel = 'OFF' } = options;
  const [checked, setChecked] = useState(defaultValue);
  const label = checked ? onLabel : offLabel;
  return { checked, onChange: setChecked, label };
}
