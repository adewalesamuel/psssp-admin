//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';

export function SubscriptionPlanEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useSubscriptionPlan = Hooks.useSubscriptionPlan();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useSubscriptionPlan.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useSubscriptionPlan.updateSubscriptionPlan(
                id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useSubscriptionPlan.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useSubscriptionPlan.setIsDisabled(true);

        try {
            await useSubscriptionPlan.getSubscriptionPlan(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        } finally{
            useSubscriptionPlan.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier le Plan</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.SubscriptionPlanForm useSubscriptionPlan={useSubscriptionPlan}
            isDisabled={useSubscriptionPlan.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
