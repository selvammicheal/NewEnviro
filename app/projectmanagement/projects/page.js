"use client"
import React from 'react';
import dynamic from 'next/dynamic'
const ProjectContainer = dynamic(() => import('@/components/Projects/ProjectContainer'), {
    ssr: false,
})


function page(props) {
    return (
        <div>
            <ProjectContainer />
        </div>
    );
}

export default page;