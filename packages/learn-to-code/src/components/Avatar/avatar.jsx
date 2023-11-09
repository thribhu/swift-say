/**
 * @fileoverview Avatar component with tailwind css
 */

import React from "react";
export default function Example() {
  return (
    <>
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-4">
        <div class="shrink-0">
          <img
            class="h-12 w-12 rounded"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="ChitChat Logo"
          />
        </div>
        <div>
          <div class="text-xl font-medium text-sky-400">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>
    </>
  );
}
