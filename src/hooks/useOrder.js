import { useState } from 'react';
import { Services } from '../services';

export const useOrder = () => {
    const [id, setId] = useState('');
	const [code, setCode] = useState('');
	const [quantity, setQuantity] = useState('');
	const [amount, setAmount] = useState('');
	const [status, setStatus] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getOrder = (orderId, signal) => {        
        return Services.OrderService.getById(orderId, signal)
        .then(response => {
            fillOrder(response.order);
            setIsDisabled(false);
        });
    }

    const createOrder = signal => {
        const payload = {
            code,
		quantity,
		amount,
		status,
		product_id,
		user_id,
		
        };

        return Services.OrderService.create(JSON.stringify(payload), signal);
    }
    const updateOrder = (orderId, signal) => {
        const payload = {
            code,
		quantity,
		amount,
		status,
		product_id,
		user_id,
		
        };

        return Services.OrderService.update(orderId, JSON.stringify(payload), signal);
    }
    const deleteOrder = (orderId, signal) => {
        return Services.OrderService.destroy(orderId, signal);
    }
    const fillOrder = (order) => {
        setId(order.id);
        setCode(order.code ?? '');
		setQuantity(order.quantity ?? '');
		setAmount(order.amount ?? '');
		setStatus(order.status ?? '');
		setProduct_id(order.product_id ?? '');
		setUser_id(order.user_id ?? '');
		
    }
    const emptyOrder = () => {
        setId('');
        setCode('');
		setQuantity('');
		setAmount('');
		setStatus('');
		setProduct_id('');
		setUser_id('');
		
    }

    return {
        id,
        code,
		quantity,
		amount,
		status,
		product_id,
		user_id,
		
        errors,
        isDisabled,
        setCode,
		setQuantity,
		setAmount,
		setStatus,
		setProduct_id,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getOrder,
        createOrder,
        updateOrder,
        deleteOrder,
        fillOrder,
        emptyOrder
    };
}