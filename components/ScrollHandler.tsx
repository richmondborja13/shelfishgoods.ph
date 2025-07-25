/**
 * ScrollHandler Component
 *
 * Front-end Guidelines:
 * - Handles smooth scrolling to the contact section based on URL query parameter.
 * - Uses Next.js search params and native DOM methods.
 * - UI/UX: Ensures users are scrolled to the correct section after navigation or action.
 *
 * Back-end Follow-through:
 * - No direct back-end integration, but ensure any links or redirects that use scrollTo param are coordinated with front-end.
 */
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