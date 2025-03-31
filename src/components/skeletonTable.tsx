import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type TSkeletonTable = {
  className?: string;
};

export function SkeletonTable(props: TSkeletonTable) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton
        className={cn("h-[30vh] w-full rounded-xl", props.className || "")}
      />
    </div>
  );
}
