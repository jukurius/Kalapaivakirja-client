import { useState, useEffect } from 'react'
import { getPostsPage } from '../api/axios'

const usePosts = (pageNum = 1, filters) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getPostsPage(pageNum, { signal, params: filters })
            .then(response => {
                setHasNextPage(Boolean(pageNum < response.totalPages))
                return response.data;
            })
            .then(data => {
                setResults(prev => [...prev, ...data])
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [pageNum, filters])

    return { isLoading, isError, error, results, setResults, hasNextPage }
}

export default usePosts