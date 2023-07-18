"use client";

import React, { useRef, ChangeEvent } from "react";
import { Input } from "../ui/Input";
import { useSetScore } from "@/hooks/useScore";

const scoreMap: Record<number, string> = {
  0: "S1",
  1: "S2",
  2: "S3",
  3: "S4",
  4: "S5",
  5: "S6",
  6: "S7",
  7: "S8",
  8: "S9",
  9: "S10",
  10: "Landing",
};

interface ScoreInputProps {
  inputCount: number;
}

export function ScoreInput({ inputCount }: ScoreInputProps) {
  const [inputValues, setInputValues] = useSetScore({
    inputCount: inputCount,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(inputCount).fill(null)
  );

  async function handleChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;

    if (/^\d*$/.test(value)) {
      // Check if the entered value is a numerical value
      const parsedValue = parseInt(
        value.length > 1 ? value[value.length - 1] : value,
        10
      );

      if (isNaN(parsedValue)) {
        // If the parsed value is NaN, then the value is an empty string
        const newInputValues = [...inputValues];
        newInputValues[index] = "";

        setInputValues(newInputValues);
      } else {
        const clampedValue = parsedValue < 6 ? parsedValue : 5; // Clamp the value between 0 and 5

        const newInputValues = [...inputValues];
        newInputValues[index] = isNaN(clampedValue)
          ? ""
          : clampedValue.toString();

        setInputValues(newInputValues);
      }

      // Move to the next input field if there is one
      if (index < inputCount - 1 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  return (
    <div className="grid grid-cols-6 md:grid-cols-11">
      {Array?.from({ length: inputCount }, (_, index) => (
        <div key={index} className="flex flex-col items-center mx-2">
          <span>{scoreMap[index]}</span>
          <Input
            className="p-2 shadow-md border rounded-md"
            type="number"
            value={inputValues?.[index]}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
}
