"use client";

import { format } from "date-fns";

type InputProps = {
  value?: string;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

function formatDisplay(date: Date) {
  return format(date, "yyyy-MMMMMMM-dd");
}
