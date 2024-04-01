import { useState } from 'react';
import { Services } from '../services';

export const useSubscriptionPlan = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [num_product, setNum_product] = useState('');
	const [num_account, setNum_account] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getSubscriptionPlan = (subscription_planId, signal) => {        
        return Services.SubscriptionPlanService.getById(subscription_planId, signal)
        .then(response => {
            fillSubscriptionPlan(response.subscription_plan);
            setIsDisabled(false);

            return response;
        });
    }

    const createSubscriptionPlan = signal => {
        const payload = {
            name,
		slug,
		price,
		description,
		num_product,
		num_account,
		
        };

        return Services.SubscriptionPlanService.create(
        JSON.stringify(payload), signal);
    }
    const updateSubscriptionPlan = (subscription_planId, signal) => {
        const payload = {
            name,
		slug,
		price,
		description,
		num_product,
		num_account,
		
        };

        return Services.SubscriptionPlanService.update(
        	subscription_planId, JSON.stringify(payload), signal);
    }
    const deleteSubscriptionPlan = (subscription_planId, signal) => {
        return Services.SubscriptionPlanService.destroy(subscription_planId, signal);
    }
    const fillSubscriptionPlan = (subscription_plan) => {
        setId(subscription_plan.id);
        setName(subscription_plan.name ?? '');
		setSlug(subscription_plan.slug ?? '');
		setPrice(subscription_plan.price ?? '');
		setDescription(subscription_plan.description ?? '');
		setNum_product(subscription_plan.num_product ?? '');
		setNum_account(subscription_plan.num_account ?? '');
		
    }
    const emptySubscriptionPlan = () => {
        setId('');
        setName('');
		setSlug('');
		setPrice('');
		setDescription('');
		setNum_product('');
		setNum_account('');
		
    }

    return {
        id,
        name,
		slug,
		price,
		description,
		num_product,
		num_account,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setPrice,
		setDescription,
		setNum_product,
		setNum_account,
		
        setId,
        setErrors,
        setIsDisabled,
        getSubscriptionPlan,
        createSubscriptionPlan,
        updateSubscriptionPlan,
        deleteSubscriptionPlan,
        fillSubscriptionPlan,
        emptySubscriptionPlan
    };
}