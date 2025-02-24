import React from "react";
import './Module.scss';

type ModuleProps = {
    title: string;
    description: string;
}

export const Module: React.FC<ModuleProps> = ({title, description}) => {
    return (
        <div className="module">
            <h1 className="module__title">{title}</h1>
            <p className="module__description">{description}</p>
        </div>
    );
}

export default Module;

