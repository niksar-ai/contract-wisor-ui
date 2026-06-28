import { getFileIcon, getBgSubtlColorClass, getTextColorClass, getBgColorClass } from './util';
import { formatFileSize } from './formetter';

// DocumentType -> Tree Generator
export function documentTypeToTree(list, onItemClick) {
    const tree = [];
    list.forEach(item => {
        const node = { ...item };
        node.icon = "fa-solid fa-tags";
        node.onClick = onItemClick;
        node.children = item.children ? documentTypeToTree(item.children, onItemClick) : [];
        tree.push(node);
    });
    return tree;
};

// DocumentType + Document -> Tree Generator
export function documentMergedToTree(list, onItemClick) {
    const tree = [];
    list.forEach(item => {
        const node = { ...item };
        if (item.nodeType === "02") {
            node.icon = getFileIcon(node.name);
            node.onClick = onItemClick;
        } else {
            node.icon = "fa-solid fa-tags";
        }

        node.children = item.children ? documentMergedToTree(item.children, onItemClick) : [];
        tree.push(node);
    });
    return tree;
};

// Document -> Base List Generator
export function documentToBaseList(list, onItemClick) {
    const response = [];
    list.forEach(item => {
        const listItem = { ...item };
        listItem.leading = <div className="fs-3 text-primary"><i className={getFileIcon(item.name)}></i></div>;
        listItem.title = item.name;
        listItem.subTitle = formatFileSize(item.size);
        listItem.onClick = onItemClick;
        response.push(listItem);
    });
    return response;
};

// Document Type -> Base List Generator
export function documentTypeTopDocumentCountToBaseList(list, onItemClick) {
    const response = [];
    list.forEach((item, index) => {
        const listItem = { ...item };
        listItem.leading = <div className="avatar avatar-xl"><div className={`avatar-name rounded-circle ${getBgSubtlColorClass(index)} ${getTextColorClass(index)} fs-5`}>{item.name.substring(0,1)}</div></div>
        listItem.title = item.name;
        listItem.traling = <span className={`badge rounded-pill ${getBgColorClass(index)}`}>{item.countDocument}</span>;
        listItem.onClick = onItemClick;
        response.push(listItem);
    });
    return response;
};