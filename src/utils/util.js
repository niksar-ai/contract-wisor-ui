
export const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'svg':
            return "fa-regular fa-file-image";
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'iso':
            return "fa-regular fa-file-zipper";
        case 'pdf':
            return "fa-regular fa-file-pdf";
        case 'doc':
        case 'docx':
            return "fa-regular fa-file-word";
        case 'xls':
        case 'xlsx':
            return "fa-regular fa-file-excel";
        case 'ppt':
        case 'pptx':
            return "fa-regular fa-file-powerpoint";
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'wmv':
            return "fa-regular fa-file-video";
        case 'mp3':
        case 'wav':
            return "fa-regular fa-file-audio";
        case 'html':
        case 'css':
        case 'js':
        case 'json':
        case 'xml':
        case 'php':
        case 'py':
        case 'java':
        case 'c':
        case 'cpp':
            return "fa-regular fa-file-code";
        case 'txt':
        case 'log':
            return "fa-regular fa-file-lines";
        default:
            return "fa-regular fa-file";
    }
};

export const getBgColorClass = (index) => {
    var list = [ "bg-primary", "bg-success", "bg-info", "bg-warning", "bg-danger", "bg-secondary", "bg-light", "bg-dark",];
    return list[index%list.length];   
}

export const getTextColorClass = (index) => {
    var list = [ "text-primary", "text-success", "text-info", "text-warning", "text-danger", "text-secondary", "text-light", "text-dark",];
    return list[index%list.length];   
}

export const getBgSubtlColorClass = (index) => {
    var list = [ "bg-primary-subtle", "bg-success-subtle", "bg-info-subtle", "bg-warning-subtle", "bg-danger-subtle", "bg-secondary-subtle", "bg-light-subtle", "bg-dark-subtle",];
    return list[index%list.length];   
}

export const getVariantClass = (index) => {
    var list = [ "primary", "success", "info", "warning", "danger", "secondary", "light", "dark",];
    return list[index%list.length];   
}