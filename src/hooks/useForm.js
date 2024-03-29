import { useState } from "react";

export const useForm = (initialData = {}) => {

    const [dataForm, setDataForm] = useState(initialData);

    const onInputChange = ({target}) => {
        const {name, value} = target;

        setDataForm({
            ...dataForm,
            [name]: value
        })
    }

    const onResetForm = (data = {}) => {
        if (initialData.length > 0) {
            setDataForm(initialData);
        } else {
            setDataForm(data);
        }
    }

    return {
        ...dataForm,
        dataForm,
        onInputChange,
        onResetForm
    }

}