'use client';

import { useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEvents } from '@/hooks/use-events';
import { Button } from './ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EventCard } from './EventCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function MyEventsList() {
  const { events, deleteEvent, isLoading } = useEvents();

  const userEvents = useMemo(() => {
    return events
      .filter(event => event.isUserCreated)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events]);

  return (
     <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
               <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          ))}
        </div>
      ) : userEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEvents.map(event => (
            <div key={event.id} className="relative group">
              <EventCard event={event} />
              <div className="absolute top-4 right-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your event
                          and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteEvent(event.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">You haven&apos;t created any events yet.</h3>
          <p className="text-muted-foreground mt-2">Why not create one now?</p>
          <Button asChild className="mt-4">
            <Link href="/create-event">Create Your First Event</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
