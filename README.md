
# EventHub 🎟️

A **mini Event Management System** built with **Next.js 15**, **TypeScript**, and **TailwindCSS**.
Users can create, view, filter, and manage events easily.

Live Demo: [https://event-hub2.vercel.app/](https://event-hub2.vercel.app/)

GitHub Repo: [https://github.com/abujaforhadi/EventHub](https://github.com/abujaforhadi/EventHub)

---

## 🚀 Features

* **View Events:** Browse all upcoming events with details like title, date, and location.
* **Search & Filter:** Quickly search events by title and filter by category.
* **Create Event:** Fill out a form to add new events with validation.
* **My Events Page:** View and manage only the events you created.
* **Event Details Page:** See all details about a single event on a dedicated page.
* **Delete Events:** Remove events you created.
* **Dynamic Routing:** Events are accessible via `/events/[id]`.
* **Responsive Design:** Works perfectly across desktop and mobile devices.

---

## 🗂️ Project Structure

```
eventhub/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Main layout with header
│   │   ├── page.tsx          # Home page
│   │   ├── my-events/        # My Events page
│   │   ├── create-event/     # Create Event page
│   │   └── events/[id]/      # Dynamic route for Event Details
│   │
│   ├── components/           # Reusable components (Header, EventCard, Form, etc.)
│   ├── hooks/                 # Custom hooks (useEvents)
│   ├── lib/                   # Utility functions
│   └── pages/api/             # Mock API endpoint (/api/events)
│
├── public/                    # Static assets
├── styles/                    # Global styles
├── next.config.js             # Next.js configuration
└── README.md
```

---

## ⚙️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** TailwindCSS + ShadCN/UI
* **State Management:** React Context API (or Zustand if needed)
* **Form Validation:** React Hook Form + Zod
* **Icons:** Lucide React
* **Notifications:** Sonner Toast

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/abujaforhadi/EventHub.git
cd EventHub
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will be running at:
➡️ [http://localhost:3000](http://localhost:3000)

---

## 🌐 Available Pages

| Route           | Description                                  |
| --------------- | -------------------------------------------- |
| `/`             | Home page with event listing & search/filter |
| `/create-event` | Create new event form                        |
| `/my-events`    | View and manage your created events          |
| `/events/[id]`  | Dynamic route for event details              |
| `/api/events`   | Mock API endpoint for events                 |

---

## 📝 Modules Breakdown

### **Module 1: Project Setup & Layout**

* Next.js project setup with TailwindCSS and ShadCN/UI.
* Header with navigation links: `Home | Create Event | My Events`.

---

### **Module 2: Event List (Home Page)**

* Fetch events from `/api/events` (mock API).
* Display events with:

  * Title
  * Date
  * Location
* Search bar to filter by **title**.
* Dropdown filter to filter by **category** (Conference, Workshop, Meetup).

---

### **Module 3: Event Details Page**

* Dynamic route `/events/[id]`.
* Displays full event details including description, date, location, and category.

---

### **Module 4: Create Event Page**

* Form to create new events with validation:

  * Title (min 3 characters)
  * Description (min 10 characters)
  * Date
  * Time
  * Location
  * Category
* Events are stored in local state and persist between pages.

---

### **Module 5: My Events Page**

* View only **your created events**.
* Option to delete an event.

---

## 🌟 Bonus Features

* RSVP button to track attendees.
* Edit existing events.
* Fully deployed on [Vercel](https://vercel.com/).

---

## 🧪 Validation Schema (Zod)

Example validation for creating events:

```ts
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters long"),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  location: z.string().trim().min(2, "Location is required"),
  category: z.enum(["Conference", "Workshop", "Meetup", "Social"]),
});
```

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

---

## 🚀 Deployment

Deploy easily with [Vercel](https://vercel.com/):

```bash
npm run build
npm start
```

* Configure the domain for external images in `next.config.js`:

```js
images: {
  domains: ['picsum.photos'],
},
```

---

## 📸 Screenshots

### Home Page

Browse all events with search and filter.

### Event Details

Detailed view of a single event.

### Create Event Form

Add new events with validation.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jafor Hadi**

* GitHub: [@abujaforhadi](https://github.com/abujaforhadi)
* Live Project: [EventHub](https://event-hub2.vercel.app/)

---

This README provides everything from **setup** to **deployment** and acts as a professional guide for your project.
Here’s a complete **README.md** for your **EventHub** project. It covers setup, features, folder structure, and deployment steps:

---

# EventHub 🎟️

A **mini Event Management System** built with **Next.js 15**, **TypeScript**, and **TailwindCSS**.
Users can create, view, filter, and manage events easily.

Live Demo: [https://event-hub2.vercel.app/](https://event-hub2.vercel.app/)
GitHub Repo: [https://github.com/abujaforhadi/EventHub](https://github.com/abujaforhadi/EventHub)

---

## 🚀 Features

* **View Events:** Browse all upcoming events with details like title, date, and location.
* **Search & Filter:** Quickly search events by title and filter by category.
* **Create Event:** Fill out a form to add new events with validation.
* **My Events Page:** View and manage only the events you created.
* **Event Details Page:** See all details about a single event on a dedicated page.
* **Delete Events:** Remove events you created.
* **Dynamic Routing:** Events are accessible via `/events/[id]`.
* **Responsive Design:** Works perfectly across desktop and mobile devices.

---

## 🗂️ Project Structure

```
eventhub/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Main layout with header
│   │   ├── page.tsx          # Home page
│   │   ├── my-events/        # My Events page
│   │   ├── create-event/     # Create Event page
│   │   └── events/[id]/      # Dynamic route for Event Details
│   │
│   ├── components/           # Reusable components (Header, EventCard, Form, etc.)
│   ├── hooks/                 # Custom hooks (useEvents)
│   ├── lib/                   # Utility functions
│   └── pages/api/             # Mock API endpoint (/api/events)
│
├── public/                    # Static assets
├── styles/                    # Global styles
├── next.config.js             # Next.js configuration
└── README.md
```

---

## ⚙️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** TailwindCSS + ShadCN/UI
* **State Management:** React Context API (or Zustand if needed)
* **Form Validation:** React Hook Form + Zod
* **Icons:** Lucide React
* **Notifications:** Sonner Toast

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/abujaforhadi/EventHub.git
cd EventHub
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will be running at:
➡️ [http://localhost:3000](http://localhost:3000)

---

## 🌐 Available Pages

| Route           | Description                                  |
| --------------- | -------------------------------------------- |
| `/`             | Home page with event listing & search/filter |
| `/create-event` | Create new event form                        |
| `/my-events`    | View and manage your created events          |
| `/events/[id]`  | Dynamic route for event details              |
| `/api/events`   | Mock API endpoint for events                 |

---

## 📝 Modules Breakdown

### **Module 1: Project Setup & Layout**

* Next.js project setup with TailwindCSS and ShadCN/UI.
* Header with navigation links: `Home | Create Event | My Events`.

---

### **Module 2: Event List (Home Page)**

* Fetch events from `/api/events` (mock API).
* Display events with:

  * Title
  * Date
  * Location
* Search bar to filter by **title**.
* Dropdown filter to filter by **category** (Conference, Workshop, Meetup).

---

### **Module 3: Event Details Page**

* Dynamic route `/events/[id]`.
* Displays full event details including description, date, location, and category.

---

### **Module 4: Create Event Page**

* Form to create new events with validation:

  * Title (min 3 characters)
  * Description (min 10 characters)
  * Date
  * Time
  * Location
  * Category
* Events are stored in local state and persist between pages.

---

### **Module 5: My Events Page**

* View only **your created events**.
* Option to delete an event.

---

## 🌟 Bonus Features

* RSVP button to track attendees.
* Edit existing events.
* Fully deployed on [Vercel](https://vercel.com/).

---

## 🧪 Validation Schema (Zod)

Example validation for creating events:

```ts
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters long"),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  location: z.string().trim().min(2, "Location is required"),
  category: z.enum(["Conference", "Workshop", "Meetup", "Social"]),
});
```

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

---

## 🚀 Deployment

Deploy easily with [Vercel](https://vercel.com/):

```bash
npm run build
npm start
```

* Configure the domain for external images in `next.config.js`:

```js
images: {
  domains: ['picsum.photos'],
},
```

---

## 📸 Screenshots

### Home Page

Browse all events with search and filter.

### Event Details

Detailed view of a single event.

### Create Event Form

Add new events with validation.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jafor Hadi**

* GitHub: [@abujaforhadi](https://github.com/abujaforhadi)
* Live Project: [EventHub](https://event-hub2.vercel.app/)


