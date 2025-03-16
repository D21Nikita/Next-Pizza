'use client';

import { use } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
  }
  
  export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return <AddressSuggestions token="e52ebfafbe51af9bef35121a55796d81e82df8ac" onChange={(data) => onChange?.(data?.value)} />;
  };