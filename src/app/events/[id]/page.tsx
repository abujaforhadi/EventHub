"use client";

import { notFound, useParams } from "next/navigation";
import { useEvents } from "@/hooks/use-events";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <div className="bg-muted aspect-[2/1] relative w-full">
          <Image
            src={`https://picsum.photos/seed/${event.id}/1200/600`}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">
            {event.category}
          </Badge>
          <CardTitle className="font-headline text-4xl text-primary">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-muted-foreground">
            <div className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              <span>
                {formattedDate} at {formattedTime}
              </span>
            </div>
            <div className="flex items-center text-lg">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none text-foreground/90">
            <p>{event.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Skeleton className="aspect-[2/1] w-full" />
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-10 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-8">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
