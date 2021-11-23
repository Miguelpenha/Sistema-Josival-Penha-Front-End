export default function LimitText({ children='', limit=0, points=true }) {
    if (children.length > limit) {
        let newChildren = ''
        
        for (let index = 1;index <= limit;index++) newChildren += children[index-1]
        
        if (points) {
            return newChildren+'...'
        } else {
            return newChildren
        }
    } else {
        return children
    }
}