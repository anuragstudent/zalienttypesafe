"use client";

import { motion } from "framer-motion";
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
import { registerSchema, RegisterData } from "@/shared/validation/auth";
import { useState } from "react";
import { requestHandler } from "@/utils/client/requestHandler";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: RegisterData) {
    try {
      setIsSubmitting(true);

      const data = await requestHandler<{ message: string }>({
        method: "POST",
        url: "/api/auth/register",
        body: values,
      });

      toast.success(JSON.stringify(data, null, 2));
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link
              href="/auth/login/"
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
