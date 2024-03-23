import { useState, useEffect } from 'react';
import ProductBox from "@/components/ProductBox";
import { Pagination, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'
import Error from 'next/error';

const PER_PAGE = 12;

export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    return { props: { staticProducts: data.products } };
}

const ProductList = ({ staticProducts }) => {
    const router = useRouter()
    const { search } = router.query;
    const [page, setPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false); 

    useEffect(() => {
        if (search) {
            const filteredBySearch = staticProducts.filter(prod => {
                const searchQuery = search.toLowerCase(); 
                return Object.values(prod).some(value => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchQuery);
                    }
                    return false;
                });
            });
            
            setFilteredProducts(filteredBySearch);
            setPage(1);

            // Check if search results are empty
            if (filteredBySearch.length === 0) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }
        } 
         else {
            setFilteredProducts(staticProducts);
        }
    }, [search, staticProducts]);

    if (isEmpty) {
        return <Error statusCode={404} />;
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const nextPage = () => {
        const maxPage = Math.ceil(filteredProducts.length / PER_PAGE);
        if (page < maxPage) {
            setPage(page + 1);
        }
    };

    const startIndex = (page - 1) * PER_PAGE;
    const endIndex = page * PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return (
        <>
            <div style={{ flexWrap: "wrap", display: "flex", justifyContent: "center", gap: "20px" }}>
                {currentProducts.map(prod => (
                    <ProductBox key={prod.id} product={prod} />
                ))}
            </div>
            <br />
            <Row>
                <Col>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} disabled={page === Math.ceil(filteredProducts.length / PER_PAGE)} />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};

export default ProductList;
