import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/cart/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

export default function OrderPage() {
    const { currentUser } = useAuth();

    // Ensure currentUser is not null before making a query
    const email = currentUser?.email;
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(email, { skip: !email });

    if (!email) return <div>Please log in to view your orders.</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order?._id || index} className="border-b pb-4 mb-4">
                            <p className='p-1 bg-black text-white w-10 rounded mb-1'># {index + 1}</p>
                            <h2 className="text-lg font-semibold">OrderId: {order?._id}</h2>
                            <p className="text-gray-600">Name: {order?.name}</p>
                            <p className="text-gray-600">Email: {order?.email}</p>
                            <p className="text-gray-600">Phone: {order?.phone}</p>
                            <p className="text-gray-600">TotalPrice: {order?.totalPrice}</p>
                            <h3 className='font-semibold mt-2'>Address:</h3>
                            <p>{order.address.city},{order.address.state},{order.address.country},{order.address.zipcode}</p>
                            <h3 className='font-semibold mt-2'>Products Id:</h3>
                            <ul>
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
