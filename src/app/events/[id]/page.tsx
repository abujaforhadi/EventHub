"use client";

import { notFound, useParams } from "next/navigation";
import { useEvents } from "@/hooks/use-events";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getEventById, isLoading } = useEvents();

  if (!id) notFound();
  if (isLoading) return <EventDetailsSkeleton />;

  const event = getEventById(id);
  if (!event) notFound();

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <Button variant="ghost" asChild className="gap-2 px-0 h-auto py-0 text-muted-foreground">
          <Link href="/" aria-label="Back to events">
            <ArrowLeft className="h-4 w-4" /> Back to events
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden border-0 shadow-none">
        <div className="relative aspect-[2/1] md:w-1/2 mx-auto rounded-2xl overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${event.id}/1600/800`}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <Badge variant="secondary" className="mb-2 bg-white/90 text-foreground">
              {event.category}
            </Badge>
            <h1 className="font-headline text-2xl sm:text-3xl md:text-5xl font-semibold text-white drop-shadow">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">About this event</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none text-foreground/90">
                <p>{event.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          
          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="space-y-6"
          >
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-muted p-2"><Calendar className="h-5 w-5" /></div>
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">{formattedDate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-muted p-2"><Clock className="h-5 w-5" /></div>
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-muted-foreground">{formattedTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-muted p-2"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{event.location}</div>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1">RSVP</Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleAddToCalendar(event)}>
                    <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" aria-label="Save">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Share" onClick={() => shareEvent(event)}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </Card>
    </div>
  );
}

function shareEvent(event: { title: string; id: string }) {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}/events/${event.id}`;
  if (navigator.share) {
    navigator
      .share({ title: event.title, url })
      .catch(() => copy(url));
  } else {
    copy(url);
  }
}

function copy(text: string) {
  if (typeof window === "undefined") return;
  navigator.clipboard?.writeText(text);
}

function handleAddToCalendar(event: { id: string; title: string; date: string; location?: string }) {
  if (typeof window === "undefined") return;
  const start = new Date(event.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // default 2h
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const details = new URLSearchParams({
    text: event.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: event.location || "",
    details: `${window.location.origin}/events/${event.id}`,
  }).toString();
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&${details}`, "_blank");
}

function EventDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-4/5" />
              <Separator />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
