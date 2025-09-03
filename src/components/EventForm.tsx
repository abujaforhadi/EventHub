"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, MapPin, Type, Clock4, Tag } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { useEvents } from "@/hooks/use-events";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const eventCategories = ["Conference", "Workshop", "Meetup", "Social"] as const;

const formSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long."),
  description: z.string().trim().min(10, "Description must be at least 10 characters long."),
  date: z.date(), // Calendar provides a Date directly
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time is required (HH:MM)").optional(),
  location: z.string().trim().min(2, "Location is required."),
  category: z.enum(eventCategories),
});

type FormValues = z.infer<typeof formSchema>;

function combineDateTime(date: Date, time?: string) {
  if (!time) return date;
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d;
}

export function EventForm() {
  const router = useRouter();
  const { addEvent } = useEvents();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: eventCategories[0],
      // date undefined until user selects
    },
  });

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting, isValid } = formState;

  const minDate = useMemo(() => startOfDay(new Date()), []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const combined = combineDateTime(values.date, values.time);
        await Promise.resolve(addEvent({ ...values, date: combined.toISOString() }));
        toast.success("Event Created!", { description: "Your new event has been added successfully." });
        router.push("/my-events");
      } catch {
        toast.error("Something went wrong", { description: "Please try again." });
      }
    },
    [addEvent, router]
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative space-y-1">
        <CardTitle className="font-headline text-2xl">Create an Event</CardTitle>
        <p className="text-sm text-muted-foreground">Share details and invite people.</p>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-8 p-6 md:grid-cols-5">
            <div className="md:col-span-3 space-y-6">
              <div className="grid gap-6">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                          <Input className="pl-9" placeholder="e.g. IEEE Conference" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your event..."
                          className="resize-none min-h-[140px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <Tag className="mr-2 h-4 w-4 opacity-50" />
                          <SelectValue placeholder="Select an event category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent align="end">
                        {eventCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start h-10 w-full px-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < minDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock4 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                          <Input type="time" className="pl-9" placeholder="HH:MM" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                        <Input className="pl-9" placeholder="e.g. Dhaka" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-3 border-t bg-muted/30 p-6">
            <Button type="button" variant="ghost" onClick={() => reset()} disabled={isSubmitting}>
              Reset
            </Button>
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
