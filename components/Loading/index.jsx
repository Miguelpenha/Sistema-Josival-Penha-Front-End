export default function Loading({ loading, children }) {
    if (Array.isArray(loading)) {
        let carregado = false
        
        loading.forEach(loadingChildren => {
            if (loadingChildren) {
                carregado = true
            }
        })

        if (carregado) {
            return children
        } else {
            return null
        }
    } else {
        if (loading) {
            return children
        } else {
            return null
        }
    }
}