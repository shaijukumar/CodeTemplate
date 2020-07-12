import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import { AppForm, FormField, SubmitButton, AppButton, ButtonGroup } from "../../app/Formik";
import { RootStoreContext } from "../../app/store/rootStore";
import { _Feature_ } from "./_Feature_";

const validationSchema = Yup.object().shape({
  ##JSFormValidation##
});

interface DetailParms {
  id: string;
}

const _Feature_ItemEdit: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, submitting, loadItem, createItem, editItem, getList, deleteItem } = rootStore._FeatureObj_Store;

  const [_FeatureObj_, set_Feature_] = useState(new _Feature_());

  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (id) {
      loadItem(id).then((_FeatureObj_) => {
        set_Feature_(new _Feature_(_FeatureObj_));
      });
    } else {
      set_Feature_(new _Feature_());
    }
  }, [loadItem, id]);

  const on_Feature_Submit = (values: any) => {
    editItem(values).then((stockCat) => {
      set_Feature_(new _Feature_((_FeatureObj_ as any)));
    });
  };

  const onDelete = () => {
    deleteItem(_FeatureObj_.Id).then(() => {
      history.push('/_Feature_List');
    });
  };

  return (
    <AppForm
      initialValues={_FeatureObj_}
      validationSchema={validationSchema}
      onSubmit={on_Feature_Submit}
      loadingInitial={loadingInitial}
    >
      ##JSFormFields##

      <ButtonGroup>
        <SubmitButton title={stockCat.Id === '' ? "Create" : "Update"} loader={submitting} />
        {stockCat.Id && <AppButton title="Delete" onClick={() => onDelete()} loader={submitting} />}
        <AppButton title="Back" onClick={() => { history.push('/_Feature_List'); }} loader={submitting} />
      </ButtonGroup>
    </AppForm>
  );
};

export default observer(_Feature_ItemEdit);
