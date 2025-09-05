# Eisenhower Matrix Productivity App

A simple, gamified task manager based on the **Eisenhower Matrix**.  
Stay focused, prioritize effectively, and turn productivity into rewards.

## 📋 Features

- **Four Quadrants** for prioritization:
  - **Do** – Urgent & important tasks to handle immediately
  - **Decide** – Important but less urgent tasks to schedule
  - **Delegate** – Tasks you can hand off to someone else
  - **Delete** – Distractions or low-value tasks to drop
- **Task States**  
  Mark tasks as **Active** (still on your list) or **Inactive** (completed/removed).

- **Points System**  
  When you switch a task to inactive, you earn points based on its quadrant.

- **Rewards & Motivation**  
  Exchange accumulated points for in-app prizes or milestones.

- **Clean, Responsive UI**  
  Optimized for desktop and mobile.

## 🚀 Tech stack

- **React**
- **TypeScript**
- **TanStack Queries**
- **React Router**
- **React Hook Form**
- **React Toasts**
- **SupaBase**
- **Tailwind CSS**
- **MUI**

## 📖 How it works

- Sign up or log in to the application
- Create Tasks in any quadrant.
- Mark Tasks Active / Completed (inactive)
- Earn Points automatically when a task goes Completed.
- Each quadrant gives different points.
- Optionally add tasks to "My Day" for better planning
- Redeem Rewards with your earned points.

## 🧩 Implementation plan

### **Phase one (finished) ✅**

- Create a project and download all dependencies
- Create routes
- Create sidebar and main section in the "My Tasks" page
- Create task-related components
- Create a functionality for creating/editing/removing a particular task
- Create a active-toggle functionality in listing

### **Phase two (finished) ✅**

- Add tooltips with description of each section
- Connect with the supaBase
- Create toasts for success/error outcomes
- Utilize a tanStack isPending prop

### **Phase three (ongoing) ✍**

- Create an auth functionality
- Create a login/sign up page
- Create an ErrorBoundary wrapper
- Create points (for each completed task / sum) functionality
- Create an About page
- Create a User page
- Create a Not-found page
- Create a README.md file

### **Phase four**

- Create an Award page
- Create an exchanging points for prizes functionality
- Create a section with bought awards display

### **Phase fve**

- Create a My day page
- Create a logic for adding tasks into My Day
- RWD
- Upload to Netlify

### **Extra features for future development**

- Create a tasks log (history of created/edited/removed/activity-changed tasks)
- Create a search bar
- Create a sorting/filtering functionality
- PWA
- Dark mode
- Multilang (i18n)
