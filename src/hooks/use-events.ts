'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Event } from '@/lib/types';

const STORAGE_KEY = 'eventide_events';

function loadEventsFromStorage(): Event[] {
  try {
    const storedEventsJson = localStorage.getItem(STORAGE_KEY);
    if (storedEventsJson) {
      const userEvents = JSON.parse(storedEventsJson) as Event[];
      const initialEventIds = new Set(userEvents.map(e => e.id));
      return [...userEvents.filter(e => !initialEventIds.has(e.id)), ...userEvents];
    }
  } catch (error) {
    console.error('Failed to load events from localStorage', error);
  }
  return [];
}

function saveEventsToStorage(events: Event[]) {
  try {
    const userCreatedEvents = events.filter(e => e.isUserCreated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userCreatedEvents));
  } catch (error) {
    console.error('Failed to save events to localStorage', error);
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEvents(loadEventsFromStorage());
    setIsLoading(false);
  }, []);

  const syncEvents = useCallback((updatedEvents: Event[]) => {
    saveEventsToStorage(updatedEvents);
    setEvents(updatedEvents);
  }, []);

  const addEvent = useCallback((eventData: Omit<Event, 'id' | 'isUserCreated'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      isUserCreated: true,
    };
    const updatedEvents = [...events, newEvent];
    syncEvents(updatedEvents);
    return newEvent;
  }, [events, syncEvents]);

  const deleteEvent = useCallback((eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    syncEvents(updatedEvents);
  }, [events, syncEvents]);
  
  const getEventById = useCallback((eventId: string): Event | undefined => {
    return events.find(event => event.id === eventId);
  }, [events]);


  return { events, isLoading, addEvent, deleteEvent, getEventById };
}
