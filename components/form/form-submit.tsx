"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "primary";
}
export const FormSubmit = ({
  children,
  disabled,
  className,
  variant="primary"
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return(
  <Button
    disabled={pending || disabled}
    type="submit"
    size="sm"
    className={cn(className)}
    variant={variant}
  >
    {children}
  </Button>
  )
};
