'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import {X} from 'lucide-react'
import ReactStories from "react-insta-stories"

interface Story {
    id: string | number;
    previewImageUrl: string;
    items: {id: string | number; sourceUrl: string}[];
}

const Stories = () => {
    const [stories, setStories] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<Story>({id: "", previewImageUrl: "", items: []});

    useEffect(() => {
        axios.get("/api/stories",{})
            .then(res => setStories(res.data))
    }, []);

    const onClickStory = (story: Story) => {
        if(!open){
            setSelectedStory(story);

            if (story.items.length > 0) {
                setOpen(true);
            }
        }
    };

    return (
        <div className=" container mx-auto px-16 mb-5 flex items-start gap-1 flex-wrap ">
            {stories.length === 0 &&
                [...Array(6)].map((_, index) => (
                    <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                ))}

            {stories.map((story: Story) => (
                <img
                    key={story.id}
                    onClick={() => onClickStory(story)}
                    className="rounded-md cursor-pointer"
                    height={250}
                    width={200}
                    src={story.previewImageUrl}
                />
            ))}

            {open && (
                <div className="absolute left-1/2 -translate-x-1/2  top-16 z-50 shadow-[0px_0px_109px_16px_#1a202c]">
                    <div className="relative top-0" style={{ width: 350 }}>
                        <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                            <X className="absolute top-0 right-0 w-8 h-8 text-white/50" color="#ffffff"/>
                        </button>

                        <ReactStories
                            onAllStoriesEnd={() => setOpen(false)}
                            stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                            defaultInterval={3000}
                            width={350}
                            height={500}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
export default Stories