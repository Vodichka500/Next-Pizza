import {Skeleton} from "@/components/ui/skeleton";

const ModalSkeleton = () => {
  return (
      <Skeleton className="grid grid-cols-2 grid-rows-1 gap-x-4 bg-transparent">
        <div className="relative w-full flex justify-center items-center p-20">
          <Skeleton className="h-[300px] w-[300px] rounded-full shadow-xl" />
        </div>
        <div className="relative px-4 rounded-2xl flex flex-col justify-center gap-y-3 py-10">
            <Skeleton className="h-5 w-1/2"/>
            <Skeleton className="mt-2 h-3 w-3/4"/>
            <Skeleton className="mt-2 h-3 w-3/4"/>
            <Skeleton className="mt-2 h-3 w-3/4"/>
            <div className="mt-5 flex justify-around gap-4">
                <Skeleton className="h-10 w-1/3 rounded-2xl"/>
                <Skeleton className="h-10 w-1/3 rounded-2xl"/>
                <Skeleton className="h-10 w-1/3 rounded-2xl"/>
            </div><div className="mt-5 flex justify-around gap-4">
                <Skeleton className="h-10 w-1/3 rounded-2xl"/>
                <Skeleton className="h-10 w-1/3 rounded-2xl"/>
            </div>
            <div className="mt-6 flex justify-center gap-4">
                <Skeleton className="h-40 w-1/4 rounded-xl"/>
                <Skeleton className="h-40 w-1/4 rounded-xl"/>
                <Skeleton className="h-40 w-1/4 rounded-xl"/>
            </div>
            <Skeleton className="h-10 w-2/3  rounded-2xl translate-x-[33%]"/>
        </div>
    </Skeleton>
  )
}

export default ModalSkeleton