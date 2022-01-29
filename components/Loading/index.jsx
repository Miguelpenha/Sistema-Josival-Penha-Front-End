export default function Loading({ loading, children }) {
    if (loading) {
        return children
    } else {
        return null
    }
}