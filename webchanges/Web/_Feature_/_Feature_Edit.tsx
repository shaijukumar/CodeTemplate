import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import { RootStoreContext } from "../../app/store/rootStore";
import AppFormField from "../../app/Formik/AppFormField";
import SubmitButton from "../../app/Formik/SubmitButton";
import AppForm from "../../app/Formik/AppForm";
import AppButton from "../../app/Formik/AppButton";
import { _Feature_ } from "./_Feature_";

const validationSchema = Yup.object().shape({
    ##JSFormValidation##
});

interface DetailParms {
  id: string;
}

const _Feature_ItemEdit: React.FC<RouteComponentProps<DetailParms>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, submitting, loadItem, createItem, editItem, getList } = rootStore._FeatureObj_Store;

  const [_FeatureObj_, set_Feature_] = useState(new _Feature_());

  useEffect(() => {
    debugger;
    if (match.params.id) {
      load_Feature_Item(match.params.id).then((_FeatureObj_) => {
        set_Feature_(new _Feature_(_FeatureObj_));
      });
    } else {
      set_Feature_(new _Feature_());
    }

    debugger;
  }, [load_Feature_Item, match.params.id]);

  const on_Feature_Submit = (values: any) => {
    debugger;
    if (!_FeatureObj_.Id) {
      create_Feature_Item(values);
    } else {
      edit_Feature_Item(values);
    }
  };

  return (
    <AppForm
      initialValues={_FeatureObj_}
      validationSchema={validationSchema}
      onSubmit={on_Feature_Submit}
      loadingInitial={loadingInitial}
    ></AppForm>
  );
};

export default observer(_Feature_ItemEdit);
