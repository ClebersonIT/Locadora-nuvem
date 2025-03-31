import { Skeleton } from "./ui/skeleton";

export function SkeletonForm() {
  return (
    <div className="flex min-h-[50vh] flex-col w-full px-10 py-2">
      <Skeleton className="h-[30vh] w-full rounded-xl " />

      <Skeleton className="w-full mt-4 h-[10vh] rounded-lg shadow-lg " />

      <Skeleton className="font-[500] mb-2 flex flex-row text-lg lg:text-2xl items-center bg-green-500" />

      <Skeleton className="flex flex-col-reverse gap-2 md:flex-row text-lg justify-center md:justify-between pl-4 mt-4" />
    </div>
  );
}
