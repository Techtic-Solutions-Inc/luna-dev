import { useMutation } from "@tanstack/react-query";
import { postForgotPassword } from "@/services/forgot-password.service";
import type { ForgotPasswordRequestBody } from "@/types/auth";

export function useForgotPassword() {
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: (body: ForgotPasswordRequestBody) => postForgotPassword(body),
  });
}
