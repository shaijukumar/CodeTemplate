import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "rsuite";

import { RootStoreContext } from "../../app/store/rootStore";
import ButtonGroup from "semantic-ui-react/dist/commonjs/elements/Button/ButtonGroup";
import { AppButton } from "../../app/Formik";


const _Feature_List: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, submitting, loadItem, createItem, editItem, getList, itemList } = rootStore._FeatureObj_Store;

    const [items, setItems] = useState([]);

    let history = useHistory();

    useEffect(() => {
        getList();
    }, [getList])

    return (
        <>
            <ButtonGroup>
                <Button appearance="link" onClick={() => { history.push("/_Feature_ItemEdit"); }} >Add New</Button>
                <Button appearance="link" onClick={() => { history.push("/"); }} >Home</Button>
            </ButtonGroup>
            <Table
                height={400}
                data={itemList}
                loading={loadingInitial}
                onRowClick={(data) => {
                    //console.log(data);
                    history.push(`/_Feature_ItemEdit/${data.Id}`);
                }}
            >
                ##CSListTable##

            </Table>
        </>
    );
}

export default observer(_Feature_List);