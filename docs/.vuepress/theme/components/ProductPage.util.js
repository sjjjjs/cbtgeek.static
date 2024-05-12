
class PathComponentResolver {
    constructor() {
        this.context = ''
        this.segments = []
        this.str = ''
    }
    /**
     * 解析路径字符串
     * @public
     * @param {string} source 路径字符串
     * @returns 
     */
    parse(source = '') {
        for (let index = 0; index < source.length; index++) {
            this.scanChar(source[index])
        }
        this.postTreatment();
        const data = this.segments;
        this.segments = [];
        return data;
    }
    postTreatment() {
        if (this.str) {
            const name = this.str
            this.segments.push({
                name,
                type: 'file',
                path: this.context + name
            });
            this.str = ''
        }
        this.context = ''
    }
    scanChar(char) {
        if (char === '/') {
            const name = this.str
            this.str = ''
            this.context += `${name}/`
            this.segments.push({
                type: 'dir',
                name,
                path: this.context
            });
        } else {
            this.str += char
        }
    }
}
export function parsePath(path = '') {
    const r = new PathComponentResolver();
    return r.parse(path);
}
export function isDirectFileOfDir(path, dirPath) {
    const file = path.slice(dirPath.length);
    return !!file && (file.indexOf('/')) < 0 && (dirPath + file === path)
}
export function isDirectDirOfDir(path, dirPath) {
    const dir = path.slice(dirPath.length);
    const name = dir.slice(0, -1)
    return name && (name + '/' === dir && name.indexOf('/') < 0) && (dirPath + dir === path);
}