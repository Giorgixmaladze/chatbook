const Pagination = ({ pagination, onPageChange }) => {
    const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination

    if (totalPages <= 1) {
        return null // Don't show pagination if there's only one page
    }


    const handleNext = () => {
        if (hasNextPage) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageClick = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            
            let start = 0
            let end = 3

            if (start === 1) {
                end = Math.min(maxVisible, totalPages)
            }
            if (end === totalPages) {
                start = Math.max(1, totalPages - maxVisible + 1)
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div style={{
        }}>
            

            {pageNumbers[0] > 1 && (
                <>
                    <button
                        onClick={() => handlePageClick(1)}
                        style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}
                    >
                        1
                    </button>
                    {pageNumbers[0] > 2 && <span>...</span>}
                </>
            )}

            {pageNumbers.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        border: `1px solid ${pageNum === currentPage ? '#007bff' : '#ccc'}`,
                        borderRadius: '4px',
                        backgroundColor: pageNum === currentPage ? '#007bff' : '#fff',
                        color: pageNum === currentPage ? '#fff' : '#000',
                        fontWeight: pageNum === currentPage ? 'bold' : 'normal'
                    }}
                >
                    {pageNum}
                </button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
                    <button
                        onClick={() => handlePageClick(totalPages)}
                        style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}
                    >
                        {totalPages}
                    </button>
                </>
            )}


          
        </div>
    )
}

export default Pagination


