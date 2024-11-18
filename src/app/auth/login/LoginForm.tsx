"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import { loginSchema, LoginData } from "@/shared/validation/auth";
import { useState } from "react";
import { requestHandler } from "@/utils/client/requestHandler";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: LoginData) {
    setIsSubmitting(true);

    try {
      const data = await requestHandler<{ message: string; token?: string }>({
        method: "POST",
        url: "/api/auth/login",
        body: values,
      });

      // Show the full response data on success

      toast.success(JSON.stringify(data, null, 2));
      router.push("/dashboard");
    } catch (error) {
      // Show the error message in toast
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <span className="text-2xl font-semibold">Zalient</span>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="me@example.com"
                    {...field}
                    type="email"
                    tabIndex={1} // Tab to username first
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/auth/forgot-password/"
                    className="text-xs underline text-muted-foreground" // Tab to forgot password last
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="******"
                    {...field}
                    tabIndex={2} // Tab to password second
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register/"
              className="text-black underline dark:text-white"
              tabIndex={6} // Tab to signup after forgot password
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
