import clsx from "clsx";
import {Skeleton} from "@/components/ui/skeleton";

const SkeletonTopBar = () => {
    return (
        <div className=" inline-flex gap-5 p-1 rounded-2xl z-100">
            {
                Array.from({ length: 5 }).map((i, index) => {
                    return(
                        <Skeleton
                            key={index}
                            className={clsx("flex items-center font-bold h-11 rounded-2xl px-5 w-20", i === 1 && 'bg-white shadow-md shadow-gray-200 text-primary')}/>
                    )

                })
            }
        </div>
    )
}

export default SkeletonTopBar