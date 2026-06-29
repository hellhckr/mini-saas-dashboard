"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const currentStatus = searchParams.get("status") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(searchTerm, currentStatus);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]); // Only depends on searchTerm

  useEffect(() => {
    // Only update if status actually changed (not on first render)
    const timer = setTimeout(() => {
      updateUrl(searchTerm, currentStatus);
    }, 0); // Immediate

    return () => clearTimeout(timer);
  }, [currentStatus]); // Only depends on currentStatus

  // Helper function to update URL
  const updateUrl = (search: string, status: string) => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    if (status) {
      params.set("status", status);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";
    router.push(newUrl);
  };

  // Handle status filter button clicks
  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    if (status) {
      params.set("status", status);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";
    router.push(newUrl);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div>
        <Input
          type="text"
          placeholder="Search projects by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Status Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={currentStatus === "" ? "default" : "outline"}
          onClick={() => handleStatusFilter("")}
          size="sm"
        >
          All Projects
        </Button>
        <Button
          variant={currentStatus === "active" ? "default" : "outline"}
          onClick={() => handleStatusFilter("active")}
          size="sm"
        >
          Active
        </Button>
        <Button
          variant={currentStatus === "on hold" ? "default" : "outline"}
          onClick={() => handleStatusFilter("on hold")}
          size="sm"
        >
          On Hold
        </Button>
        <Button
          variant={currentStatus === "completed" ? "default" : "outline"}
          onClick={() => handleStatusFilter("completed")}
          size="sm"
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
