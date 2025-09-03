import { EventForm } from "@/components/EventForm"

export default function CreateEventPage() {
  return (
    <div className="space-y-8 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-2">Fill out the details below to create your event</p>
      </div>
      
      <EventForm />
    </div>
  );
}