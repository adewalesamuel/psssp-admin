//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function SubscriptionPlanListView() {
    let abortController = new AbortController();

    const { SubscriptionPlanService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'price': {},
		'description': {},
		'num_product': {},
		'num_account': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [subscription_plans, setSubscriptionPlans] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/subscription-plans/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, subscription_plan) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce subscription_plan')) {
            const subscription_plansCopy = [...subscription_plans];
            const index = subscription_plansCopy.findIndex(subscription_planItem => 
                subscription_planItem.id === subscription_plan.id);

            subscription_plansCopy.splice(index, 1);
            setSubscriptionPlans(subscription_plansCopy);

            await SubscriptionPlanService.destroy(subscription_plan.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {subscription_plans} = await SubscriptionPlanService.getAll(
                {page: page}, abortController.signal);

            setSubscriptionPlans(subscription_plans.data);
            setPageLength(subscription_plans.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <>
            <h6>Liste SubscriptionPlans</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/subscription-plans/create'>
                    <i className='icon ion-plus'></i> Créer un plan
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={subscription_plans}/>
            </Components.Loader>
        </>
    )
}
