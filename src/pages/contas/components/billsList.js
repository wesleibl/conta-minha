import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { BillsItem } from "../components/billsItem"

export function BillsList({list}) {
    return (
        <FlatList
            style={{}}
            data={list}
            renderItem={({item}) => 
                <BillsItem data={item} toggleChecked={true} />
            }
        />
    )
}