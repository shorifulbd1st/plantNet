import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PurchaseModal = ({ isOpen, setIsOpen, plant }) => {
    // const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        _id, name, description, category, price, quantity, image, seller
    } = plant || {}
    const [totalQuantity, setTotalQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(price);
    const [purchaseInfo, setPurchaseInfo] = useState({
        customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        },
        plantId: _id,
        price: totalPrice,
        quantity: totalQuantity,
        seller: seller?.email,
        address: '',
        status: 'Pending'
    })
    const handleQuantity = value => {

        if (value > quantity) {
            setTotalQuantity(quantity)
            setTotalPrice(price * quantity)
            return toast.error('Quantity exceeds available stock')
        }
        if (value <= 0) {

            setTotalQuantity(1)
            setTotalPrice(price)
            return toast.error('Quantity cannot be less than 1')
        }
        setTotalPrice(price * value)
        setTotalQuantity(value)
        setPurchaseInfo(prev => {
            return { ...prev, quantity: value, price: value * price }
        })
    }
    const handlePurchase = async () => {
        // console.table(purchaseInfo);
        try {
            const res = await axiosSecure.post('/order', purchaseInfo)
            // console.log(res)
            if (res.data.insertedId) {
                toast.success('your order successful')
            }
        } catch (error) {
            toast.error('your order fail')
        } finally {
            setIsOpen(false)
        }

    }
    return (
        <div className="relative flex justify-center">
            {/* <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
                Open Modal
            </button> */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-10 flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center bg-black bg-opacity-50 sm:block sm:p-0"
                        role="dialog"
                        aria-modal="true"
                    >
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                            {/* <div>
                                <img
                                    className="object-cover w-full h-48 rounded-md"
                                    src="https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt=""
                                />
                                <div className="mt-4 text-center">
                                    <h3 className="font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        Welcome to your dashboard
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center mt-4">
                                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-500 rounded-full"></button>
                                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
                                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
                                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
                            </div> */}

                            <div className='text-lg font-medium text-center leading-6 text-gray-900'>

                                <h1> Review Info Before Purchase</h1>
                            </div>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>Plant: {name} </p>
                            </div>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>Category: {category} </p>
                            </div>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>Customer: {user?.displayName} </p>
                            </div>

                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>Price: ${price} </p>
                            </div>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>Available Quantity: {quantity} </p>
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='quantity' className='mr-4 text-gray-600'>
                                    <strong>Quantity</strong>
                                </label>
                                <input
                                    // max={quantity}
                                    value={totalQuantity}
                                    onChange={(e) => handleQuantity(parseInt(e.target.value))}
                                    className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                                    name='quantity'
                                    id='quantity'
                                    type='number'
                                    placeholder='quantity'
                                    required
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='address' className='block text-gray-600'>
                                    <strong>Address</strong>
                                </label>
                                <textarea
                                    // max={5}
                                    className='w-full p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                                    name='address'
                                    onChange={e => setPurchaseInfo(prev => {
                                        return { ...prev, address: e.target.value }
                                    })}
                                    id='address'
                                    type='text'
                                    placeholder='Shipping address...'
                                    required
                                />
                            </div>
                            <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full  px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                >
                                    cancel
                                </button>
                                <button onClick={handlePurchase}
                                    className="w-full  px-4 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                >
                                    {`Pay $${totalPrice}`}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PurchaseModal
