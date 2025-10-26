import React from 'react'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  title?: string
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, title }) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none" title={title}>
      <span className="mr-2 text-sm text-white/90">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${checked ? 'bg-white/50' : 'bg-white/20'}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>
    </label>
  )
}

export default Switch
