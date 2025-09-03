import { MyEventsList } from "@/components/MyEventsList"

export default function MyEventsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">
          My Events
        </h1>
        <p className="text-muted-foreground mt-2">
          Here are the events you&apos;ve created.
        </p>
      </header>
      <MyEventsList />
    </div>
  );
}
