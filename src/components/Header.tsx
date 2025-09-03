"use client";

import React from "react";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-[#602FDC]">
            EventHub
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>

          <Link
            href="/my-events"
            className={cn(
              "text-sm font-medium transition-colors  hover:text-primary",
              isActive("/my-events") ? "text-primary" : "text-"
            )}
          >
            My Events
          </Link>

          <Link href="/create-event">
            <Button
              size="sm"
              className="bg-[#602FDC] hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4 mr-2 " />
              Create Event
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
