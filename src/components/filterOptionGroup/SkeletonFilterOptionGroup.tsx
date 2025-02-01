import {Skeleton} from "@/components/ui/skeleton";

const SkeletonFilterOptionGroup = () => {
    return(
        <div className="py-8 border-b-2 border-b-gray-100">
            <Skeleton className="h-6 w-2/3"/>
            <div className="flex gap-1 items-center">
                <Skeleton className="h-4 w-4 rounded-xl mt-5"/>
                <Skeleton className="h-3 w-3/4 mt-5"/>
            </div>
            <div className="flex gap-1 items-center">
                <Skeleton className="h-4 w-4 rounded-xl mt-5"/>
                <Skeleton className="h-3 w-3/4 mt-5"/>
            </div>
            <div className="flex gap-1 items-center">
                <Skeleton className="h-4 w-4 rounded-xl mt-5"/>
                <Skeleton className="h-3 w-3/4 mt-5"/>
            </div>
            <Skeleton className="h-3 w-1/3 mt-5"/>

        </div>
    )
}

export default SkeletonFilterOptionGroup