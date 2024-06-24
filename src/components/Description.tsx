import { useState } from "react"

export function Description() {
    const [showMore, setShowMore] = useState(false);
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo vitae nemo molestias cum ullam labore distinctio quisquam nisi nostrum maxime dolore hic, veniam totam dolores consectetur. Aliquid, magni ducimus?"
    return <>
        <div className="bg-slate-200 rounded-md p-5 mt-5">
            <p>
                {showMore ? text : text.substring(0, 20)} {" "}
                <button onClick={()=>setShowMore(prev=> !prev)} className={showMore ? "font-semibold flex flex-col mt-5" : "font-semibold"}
                >{showMore ? "Show less" : "Show more"}</button>
            </p>
        </div>
    </>
}