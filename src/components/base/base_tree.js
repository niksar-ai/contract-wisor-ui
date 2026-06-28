import React, { useState } from 'react';
import '../../styles/tree.css';

const Tree = ({ data, isAllOpen }) => {
    let index = 0;
    let level = 0;

    return (
        <ul className="tree">
            {data.map((item, index) =>
                <TreeItem key={item.id} item={item} level={level} index={index++} isAllOpen={isAllOpen ?? false} />
            )}
        </ul>
    );
};

const TreeItem = ({index, item, level, isAllOpen }) => {
    const [isOpen, setIsOpen] = useState(isAllOpen);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClick = () => item.onClick ? item.onClick(item) : null;

    return (
        <li className="node" id={index}>
            <div className="node-header" style={{ paddingLeft: `${level * 30}px`, backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f0f0' }}>
                {item.children && item.children.length > 0 ? (
                    <i className={`bi ${isOpen ? "bi-chevron-down" : "bi-chevron-right"} mx-2`} onClick={handleToggle} ></i>
                ) : (
                    <span style={{ paddingLeft: 32, }}></span>
                )}
                <label className="w-100" onClick={handleClick}>
                    <i className={item.icon}></i> {item.name}
                </label>
            </div>
            {isOpen && item.children && (
                <ul className="tree">
                    {item.children.map((child, childIndex) => (
                        <TreeItem key={child.id} item={child} level={level + 1} index={index + childIndex + 1} isAllOpen={isAllOpen ?? false} />
                    ))}
                </ul>
            )}
        </li>
    );
};



export default Tree;
