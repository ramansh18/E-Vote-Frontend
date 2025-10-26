
import { useRef, useEffect } from "react"
import { TextField, Box } from "@mui/material"

const OTPInput = ({ value, onChange, length = 6, autoFocus = false }) => {
  const inputs = useRef([])

  useEffect(() => {
    if (autoFocus && inputs.current[0]) {
      inputs.current[0].focus()
    }
  }, [autoFocus])

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "")

    // Paste handling
    if (val.length === length) {
      onChange(val)
      inputs.current[length - 1]?.focus()
      return
    }

    const newValue = value.split("")
    newValue[index] = val[0] || ""
    onChange(newValue.join(""))

    // Smooth transition to next input
    if (val && index < length - 1) {
      setTimeout(() => {
        inputs.current[index + 1]?.focus()
      }, 50)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newValue = value.split("")
      if (!newValue[index]) {
        if (index > 0) {
          inputs.current[index - 1]?.focus()
        }
      }
      newValue[index] = ""
      onChange(newValue.join(""))
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputs.current[index] = el)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" },
          }}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          variant="outlined"
          size="small"
          sx={{
            width: 48,
            transition: "box-shadow 0.2s",
            "& input:focus": {
              boxShadow: "0 0 0 2px #3b82f6",
              borderRadius: "4px",
            },
          }}
        />
      ))}
    </Box>
  )
}

export default OTPInput
