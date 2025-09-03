import { Events } from "@/components/Events";

export default function Home() {
  return (
    <main className="text-center mx-20">
      <h1 className="text-4xl font-bold font-headline text-primary">
        Upcoming Events
      </h1>
      <p className="text-muted-foreground mt-2">
        Discover conferences, workshops, and meetups.
      </p>
      <Events />
    </main>
  );
}
