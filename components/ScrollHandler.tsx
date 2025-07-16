"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollHandler() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams?.get("scrollTo") === "contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);
  return null;
} 