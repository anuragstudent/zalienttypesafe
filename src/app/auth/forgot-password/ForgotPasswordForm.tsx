"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  forgotPasswordSchema,
  ForgotPasswordData,
} from "@/shared/validation/auth";
import { useState } from "react";
import { requestHandler } from "@/utils/client/requestHandler";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordData) => {
    try {
      setLoading(true);

      const data = await requestHandler<{ message: string }>({
        method: "POST",
        url: "/api/auth/forgot-password",
        body: values,
      });

      toast.success(JSON.stringify(data, null, 2));
    } catch (error) {
      // Show the error message in toast
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center gap-2 pb-8">
            <div className="flex flex-row items-center gap-4 p-3 bg-white/10 rounded-xl">
              <Image
                alt="logo"
                width={40}
                height={40}
                src="/icon.png"
                className="h-[20px] w-[20px] object-contain"
              />
            </div>
            <span className="text-2xl font-semibold">Forgot Password</span>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="me@example.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
          <div className="mt-4 text-sm text-center">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-black underline dark:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
