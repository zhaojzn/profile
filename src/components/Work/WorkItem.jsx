import React from 'react'

const WorkItem = (props) => {

    const state = props.currentCompany === props.company;

    return (
        <button
            onClick={() => props.change(props.company)}
            className={`mt-5 w-[280px] max-w-full text-left rounded px-5 py-5 transition-colors cursor-pointer ${
                state
                    ? 'bg-neutral-800 text-indigo-400'
                    : 'bg-transparent text-zinc-400 hover:text-indigo-400 hover:bg-neutral-800/50'
            }`}
        >
            <span className="text-base font-medium">{props.company}</span>
        </button>
    )
}

export default WorkItem