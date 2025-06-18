"use client";

import { Toggle } from "react-daisyui";
import { useState } from "react";

interface ToggleHelmetProps {
  defaultChecked?: boolean;
  handleChange?: () => Promise<void>; 
}

export default function ToggleHelmet({
  defaultChecked = false,
  handleChange,
}: Readonly<ToggleHelmetProps>) {
  const [checked, setChecked] = useState(defaultChecked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = !checked;
    
    if (handleChange) {
      try {
        setLoading(true);
        await handleChange();
        setChecked(newChecked)
        // Success, keep state as is
      } catch (error) {
        console.error("Toggle failed", error);
        // Rollback kalau gagal
        setChecked(!newChecked);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Toggle
        className="border-0"
        checked={checked}
        onChange={handleToggle}
        disabled={loading}
      />
      {loading && (
        <span className="loading loading-spinner loading-xs"></span> 
      )}
    </div>
  );
}
