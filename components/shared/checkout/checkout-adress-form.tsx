'use client'

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form";
import { AdressInput } from "../adress-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error";


interface Props {
    className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext();
    
    return (
        <WhiteBlock title="3. Адрес" className={className}> 
            <div className="flex flex-col gap-5">
                <Controller
                    name="address"
                    control={control}
                    render={({field, fieldState}) => <>
                        <AdressInput onChange={field.onChange} />
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                    </>}
                />

                <FormTextarea 
                    name="comment" 
                    rows={5} 
                    placeholder="Введите комментарий ..." 
                    className="text-base" 
                />
            </div>
        </WhiteBlock>
    )
};