import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function usePaginatedData(service, defaultPerPage) {
    const [data, setData] = useState([])
    const [pagesNumber, setPagesNumber] = useState(0)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const page = searchParams.get('page')
        const perPage = searchParams.get('per_page')
        const params = page ? { page, per_page: perPage } : undefined
        service.getAll(params)
            .then((res) => {
                setData(res.data.data)
                setPagesNumber(Math.ceil(res.data.meta.total / (perPage || defaultPerPage)))
            })
            .catch((err) => setError('Ошибка загрузки данных'))
    }, [searchParams])

    return { data, setData, pagesNumber, error, setError }
}

export default usePaginatedData