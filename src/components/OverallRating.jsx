import React from "react";

export default function OverallRating({ rating }) {
  return (
    <div className="w-full">
      <div className="bg-white py-24 sm:py-32 px-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Rating</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {rating} ⭐
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
