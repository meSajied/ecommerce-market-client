import React from "react";
import {FilterData} from '../components/FilterData';
import { ListAdminData } from "../components/ListAdminData";

function UpdateProduct() {
  const {allProducts} = FilterData();

  return(
    <ListAdminData productList={allProducts} />
  )
}

export {UpdateProduct}