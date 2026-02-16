import "./Pagination.css";

type Props = {
    page: number;
    totalPages: number;
    onChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
    const getVisiblePages = () => {
        const maxVisiblePages = 5;
        const pages = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page < 2) {
                pages.push(0, 1, 2, "...", totalPages - 1);
            } else if (page > totalPages - 3) {
                pages.push(0, "...", totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pages.push(0, "...", page - 1, page, page + 1, "...", totalPages - 1);
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                disabled={page === 0}
                onClick={() => onChange(page - 1)}
            >
                Previous
            </button>

            {visiblePages.map((p, index) =>
                typeof p === "number" ? (
                    <button
                        key={index}
                        className={`pagination-btn ${p === page ? "active-page" : ""}`}
                        onClick={() => onChange(p)}
                    >
                        {p + 1}
                    </button>
                ) : (
                    <span key={index} className="pagination-ellipsis">
                        ...
                    </span>
                )
            )}

            <button
                className="pagination-btn"
                disabled={page >= totalPages - 1}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}