"use client";
import React, { useState } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Label from '@radix-ui/react-label';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-4 md:my-0">
      <div className="w-full md:w-1/2 relative flex flex-col justify-center">
        <div className="flex flex-col items-start w-full pt-4 pl-4 md:pt-4 md:pl-4">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-cyan-500 text-white rounded-full p-2 shadow transition group"
                  aria-label="Back to landing page"
                  onClick={() => window.location.href = '/'}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="right" align="center" className="px-2 py-1 rounded bg-gray-900 text-white text-xs shadow-lg">
                  Back to Home Page
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

        </div>
        <div className="p-8 md:p-12 pt-0 pb-4 md:pt-0 md:pb-8 flex flex-col justify-center h-full">
          <form className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Login your account</h3>
              <p className="text-gray-500">Sign in to access your dashboard</p>
            </div>
            <div className="flex flex-row gap-3 w-full mb-6">
              <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
                <Image src="/images/icons/image.png" alt="Google" width={20} height={20} />
              </Button>
              <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
                <Image src="/images/icons/image copy.png" alt="Apple" width={20} height={20} />
              </Button>
              <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
                <Image src="/images/icons/image copy 2.png" alt="Facebook" width={20} height={20} />
              </Button>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-3 text-gray-500 font-medium">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <div>
              <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</Label.Root>
              <input id="email" name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="example@email.com" />
            </div>
            <div>
              <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</Label.Root>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label.Root className="flex items-center text-sm text-gray-700 cursor-pointer">
                <Checkbox.Root className="mr-2 w-4 h-4 rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" id="remember-me">
                  <Checkbox.Indicator className="text-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l2.5 2.5L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Remember me
              </Label.Root>
              <Link href="/user/registration" className="text-sm text-blue-600 hover:underline font-medium">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-md transition">Sign in</Button>
          </form>
          <div className="text-center mt-6 text-sm text-black">
            Don't have an account?{' '}
            <Link href="/user/registration" className="text-blue-600 hover:underline font-semibold">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-400 p-8 relative flex-col">
        <div className="absolute top-4 right-4 z-20">
          <Image src="/images/icons/logosg.png" alt="Shelf-ish Goods Logo" width={48} height={48} />
        </div>
        <div className="flex flex-col items-center justify-center relative flex-grow min-h-[500px] mb-2 mt-16">
          <svg width="440" height="440" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 z-0">
            <circle cx="220" cy="220" r="200" fill="#fff" fillOpacity="0.08" />
            <circle cx="220" cy="220" r="150" fill="#fff" fillOpacity="0.12" />
            <circle cx="220" cy="220" r="100" fill="#fff" fillOpacity="0.18" />
          </svg>
          <Image src="/images/graphics/image copy.png" alt="Login Illustration" width={5120} height={5120} className="z-10 w-[32rem] h-[32rem] object-contain relative" />
        </div>
        <div className="z-10 text-left w-full mb-5 flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">Welcome back, Seller!</h2>
          <p className="text-base text-cyan-50 font-medium drop-shadow">Sign in to manage your store and inventory.</p>
        </div>
      </div>
    </div>
  );
} 