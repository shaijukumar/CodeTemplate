import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from "yup";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

import { Page } from '../../../app/models/page';
import AppFormField from '../../../app/Formik/AppFormField';
import SubmitButton from '../../../app/Formik/SubmitButton';
import { RootStoreContext } from '../../../app/store/rootStore';
import AppForm from '../../../app/Formik/AppForm';
import AppButton from '../../../app/Formik/AppButton';


const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label("Title"),
    CategoryId: Yup.string().required().min(1).label("Category"),
    URLTitle: Yup.string().required().min(1).label("Page URL"),
    PageHtml: Yup.string().required().min(1).label("Page Content"),
});

interface DetailParms {
    id: string
}

const PageItemEdit: React.FC<RouteComponentProps<DetailParms>> = ({ match, history }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        loadingInitial,
        createPageItem,
        editPageItem,
        submitting,
        loadPageItem,
        deletePageItem
    } = rootStore.pageStore;

    const [page, setPage] = useState(new Page());

    useEffect(() => {
        debugger;
        if (match.params.id) {
            loadPageItem(match.params.id)
                .then((page) => {
                    setPage(new Page(page))
                })
        }
        else {
            setPage(new Page());
        }

        debugger;
    }, [
        loadPageItem,
        match.params.id,
    ]);


    const onPageSubmit = (values: any) => {
        debugger;
        if (!page.Id) {
            createPageItem(values);
        } else {
            editPageItem(values);
        }
    }

    return (
        <AppForm initialValues={page} validationSchema={validationSchema} onSubmit={onPageSubmit} loadingInitial={loadingInitial} >
            <AppFormField name="Title" placeholder="Title" />
            <AppFormField name="Description" placeholder="Description" />
            <AppFormField name="CategoryId" placeholder="CategoryId" />
            <AppFormField name="URLTitle" placeholder="Page URL" />
            <AppFormField name="PageHtml" placeholder="Page Content" />

            <SubmitButton title="Submit" loader={submitting} />
            <AppButton title="Back" onClick={() => { history.push('/PageItemList'); }} loader={submitting} />
        </AppForm>
    )
}

export default observer(PageItemEdit);
