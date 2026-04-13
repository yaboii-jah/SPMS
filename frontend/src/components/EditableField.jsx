import { useState, useEffect, useRef } from 'react'
import './EditableField.css'

export function EditableField({
    label,
    value,
    field,
    onChange,
    onSave
}) {
    const [editing, setEditing] = useState(false)
    const [localValue, setLocalValue] = useState(value || '')
    const [status, setStatus] = useState('idle')

    const timeoutRef = useRef(null)

    useEffect(() => {
        setLocalValue(value || '')
    }, [value])

    useEffect(() => {
        if (!editing) return

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(async () => {
            if (!localValue.trim()) {
                setStatus('error')
                return
            }

            setStatus('saving')

            const success = await onSave(field, localValue)
            setStatus(success ? 'saved' : 'error')

            setTimeout(() => setStatus('idle'), 1500)
        }, 600)

        return () => clearTimeout(timeoutRef.current)
    }, [localValue])

    function handleBlur() {
        setEditing(false)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            setEditing(false)
        }
    }

    return (
        <div className="field">
            <span className="field-label">{label}</span>

            {editing ? (
                <input
                    autoFocus
                    value={localValue}
                    onChange={(e) => {
                        setLocalValue(e.target.value)
                        onChange(field, e.target.value)
                    }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="field-input"
                />
            ) : (
                <p className="field-value" onClick={() => setEditing(true)}>
                    {value || '—'}
                </p>
            )}

            <span className={`field-status ${status}`}>
                {status === 'saving' && 'Saving...'}
                {status === 'saved' && 'Saved'}
                {status === 'error' && 'Invalid input'}
            </span>
        </div>
    )
}