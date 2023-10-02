"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/public/logo.jpeg";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useBoardStore } from "@/store/BoardStore";

export default function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:gap-0 items-center justify-between p-4 shadow-lg bg-gray-500/10 text-slate-700 md:px-20 md:space-x-8 rounded-lg overflow-hidden">
      <Link
        href="/"
        className="flex items-center flex-col gap-2 hover:opacity-80"
      >
        <Image
          width={50}
          height={50}
          src={Logo}
          alt="FirstCall"
          className="rounded-full mix-blend-multiply"
        />
        <div className="text-xs font-extrabold hidden md:block">
          FirstCall QA
        </div>
      </Link>
      <form
        onSubmit={(e) => submitSearch(e)}
        className="flex w-full md:w-auto flex-1 md:flex-none items-center space-x-2 shadow-md rounded-md overflow-hidden p-2 bg-white"
      >
        <MagnifyingGlassIcon className="text-gray-500 w-4 h-4" />
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="outline-none border-none font-light w-full"
          placeholder="search"
        />
        <button type="submit" className="hidden"></button>
      </form>
    </div>
  );
}
