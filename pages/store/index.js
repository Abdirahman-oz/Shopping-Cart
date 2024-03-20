import { useState } from 'react';
import ProductBox from "@/components/ProductBox";
import { Pagination, Row, Col } from 'react-bootstrap';

const PER_PAGE = 12;

export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    return { props: { staticProducts: data.products } };
}

export default function Products({ staticProducts }) {
    const [page, setPage] = useState(1);

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const nextPage = () => {
        const maxPage = Math.ceil(staticProducts.length / PER_PAGE);
        if (page < maxPage) {
            setPage(page + 1);
        }
    };

    const startIndex = (page - 1) * PER_PAGE;
    const endIndex = page * PER_PAGE;
    const currentProducts = staticProducts.slice(startIndex, endIndex);

    return (
    <>
        <div style={{ flexWrap: "wrap", display: "flex", gap: "20px" }}>
            {currentProducts.map(prod => (
                <ProductBox key={prod.id} product={prod} />
            ))}
        </div>
        <br />
        <Row className="justify-content-center mt-3">
                <Col>
        <Pagination>
            <Pagination.Prev onClick={previousPage} disabled={page === 1} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} disabled={page === Math.ceil(staticProducts.length / PER_PAGE)} />
        </Pagination>
    </Col>
</Row>
        </>
    );
}
