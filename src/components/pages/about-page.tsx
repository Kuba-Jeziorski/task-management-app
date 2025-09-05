import { Link } from "react-router";

export const AboutPage = () => {
  return (
    <div className="w-2/3 h-full p-4 bg-tma-light-100 rounded-xl">
      <div className="flex flex-col gap-3 p-2 pr-4 w-full overflow-auto h-full text-tma-blue-100 text-lg">
        <h1 className="font-black text-tma-blue-200 text-3xl">
          About this application
        </h1>
        <p className="font-bold text-balance">
          Welcome to Task Management App - a simple, smart way to stay
          productive while staying motivated. Our app is built around the
          Eisenhower Matrix, a proven method for prioritizing tasks by urgency
          and importance.
        </p>

        <h2 className="mt-5 font-black text-tma-blue-200 text-2xl">
          How it works
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <p className="font-semibold">
              Tasks are organized into four groups:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-3">
              <li>Do - Urgent & important tasks to handle immediately</li>
              <li>Decide - Important but less urgent tasks you schedule</li>
              <li>Delegate - Tasks you hand off to someone else</li>
              <li>Delete - Distractions or low-value tasks to drop</li>
            </ul>
          </li>
          <li className="font-semibold">
            Every task can be active (still on your list) or inactive (marked as
            completed).
          </li>
          <li className="font-semibold">
            When you mark a task as inactive (completed), you earn points. Each
            group awards a different number of points - rewarding you for
            clearing the right priorities.
          </li>
        </ul>
        <h2 className="mt-5 font-black text-tma-blue-200 text-2xl">
          Turn Productivity Into Rewards
        </h2>
        <p className="font-semibold">
          Your points aren't just numbers - you can exchange them for prizes
          within the app. The more consistently you manage and complete your
          tasks, the more rewards you unlock.
        </p>
        <h2 className="mt-5 font-black text-tma-blue-200 text-2xl">Our Goal</h2>
        <p className="font-semibold">
          We believe productivity should feel encouraging, not overwhelming. By
          combining a trusted prioritization method with a built-in reward
          system, this app helps you:
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>Focus on what truly matters</li>
          <li>Build positive habits</li>
          <li>Celebrate your progress along the way</li>
        </ul>
        <Link
          to="/my-tasks"
          className="underline transition-color duration-300 hover:text-tma-blue-200 font-bold pt-4"
        >
          Start today and experience a gamified way to get things done!
        </Link>
      </div>
    </div>
  );
};
