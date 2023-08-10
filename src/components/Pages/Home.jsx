import toast, {Toaster} from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import TableRow from "../Common/TableRow";

const Home = () => {

    const {data} = useFetch("/product")
    const proData = data

    const toaster = () => {
        toast.custom(
            (<div className="alert alert-success shadow-lg w-fit">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Item added to cart</span>
                </div>
            </div>), {duration: 500}
        );
    }

    return (<section>
        {proData ? <div className="overflow-x-auto w-full">
            <table className="table w-full container mx-auto">
                {/* head */}
                <thead className="text-center">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th className="hidden md:block">Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* rows */}
                {proData.map(product => {
                    return <TableRow product={product} key={product.id} toaster={toaster}/>;
                })}
                </tbody>
            </table>
        </div> : <button className="btn btn-ghost loading mt-10 btn-xl btn-block">loading</button>}
        <Toaster/>
    </section>)
}

export default Home