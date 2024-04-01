//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function SubscriptionPlanCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useSubscriptionPlan = Hooks.useSubscriptionPlan();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useSubscriptionPlan.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useSubscriptionPlan.createSubscriptionPlan(abortController.signal);

            navigate('/subscription-plans');
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
            
        } catch (error) {
            console.log(error);
        } finally {
            useSubscriptionPlan.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer SubscriptionPlan</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.SubscriptionPlanForm useSubscriptionPlan={useSubscriptionPlan}
            isDisabled={useSubscriptionPlan.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
