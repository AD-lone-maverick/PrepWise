"use client"

import * as React from "react"
import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
      ...props
  }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    return {
        id: itemContext.id,
        name: fieldContext.name,
        formItemId: `${itemContext.id}-form-item`,
        formDescriptionId: `${itemContext.id}-form-item-description`,
        formMessageId: `${itemContext.id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
}

function FormLabel({
                       className,
                       ...props
                   }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    const { error, formItemId } = useFormField()

    return (
        <label
            className={cn("text-sm font-medium", error && "text-red-500", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
}

function FormControl({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { formItemId } = useFormField()

    return <div id={formItemId} {...props} />
}

function FormDescription({
                             className,
                             ...props
                         }: React.HTMLAttributes<HTMLParagraphElement>) {
    const { formDescriptionId } = useFormField()

    return (
        <p
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}

function FormMessage({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLParagraphElement>) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : props.children

    if (!body) return null

    return (
        <p
            id={formMessageId}
            className={cn("text-sm font-medium text-red-500", className)}
            {...props}
        >
            {body}
        </p>
    )
}

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
}