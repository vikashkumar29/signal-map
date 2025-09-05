import { AutoComplete, type AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useEffect, useRef, useState } from 'react';
import { fetchSearchResults } from './api/addressSearchApi';
import type { Address, LatLng } from './model/model';

export interface AddressAutoCompleteProps {
    center: LatLng;
    onSelect?: (address: Address) => void;
}

function AddressAutoComplete({ center, onSelect }: AddressAutoCompleteProps) {
    const [value, setValue] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const abortControllerRef = useRef<AbortController>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const getResults = async () => {
            // Cancel previous request if still in-flight
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new controller for this request
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const results = await fetchSearchResults(debouncedQuery, center, controller.signal);
            setSuggestions(results);
        };

        if (debouncedQuery) {
            getResults();
        } else {
            setSuggestions([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

    const searchApi = (event: AutoCompleteCompleteEvent) => setQuery(event.query);

    const onAddressSelect = (address: Address) => {
        setValue('');
        onSelect?.(address);
    }

    return (
        <IconField iconPosition='left' className='absolute right-3 top-3 z-[500]' >
            <InputIcon className="pi pi-search z-[500]" />
            <AutoComplete pt={{ input: { root: { className: 'shadow-lg w-full rounded-xl pl-8' } } }}
                value={value}
                suggestions={suggestions}
                completeMethod={searchApi}
                onChange={(e) => setValue(e.value)}
                onSelect={(e) => e.value && onAddressSelect(e.value as Address)}
                field="displayName"
                className='w-96' placeholder='Search Map' />
        </IconField>
    )
}

export default AddressAutoComplete;