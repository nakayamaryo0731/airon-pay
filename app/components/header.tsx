import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="bg-orange-300 h-16 shadow-md fixed w-full">
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center space-x-4">
        <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
          <Cog6ToothIcon className="h-6 w-6 text-orange-300" />
        </button>
        <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
          <UserCircleIcon className="h-6 w-6 text-orange-300" />
        </button>
      </div>
    </header>
  );
}
