import {Skeleton} from "@/components/ui/skeleton";

const skeletonItems = () => {
    return (
        <div className="cursor-pointer">
            <Skeleton className="p-8 rounded-2xl flex justify-center ">
                <Skeleton className="w-[211px] h-[211px]"/>
            </Skeleton>
            <Skeleton className="h-4 mt-4 font-bold "/>
            <Skeleton className="h-2 w-2/3 mt-2"/>
            <Skeleton className="h-2 w-2/3 mt-2"/>
            <div className="flex justify-between mt-4">
                <Skeleton className="h-3 w-1/3"/>
            </div>
        </div>
    )
}

const SkeletonMenuSection = () => {
    return (
        <>
            <Skeleton className="h-6 w-52 mb-10" />
            <div className='grid grid-cols-3 gap-[50px] mt-4 mb-20'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index}>{skeletonItems()}</div>
                ))}
            </div>
        </>
    )
}

export default SkeletonMenuSection