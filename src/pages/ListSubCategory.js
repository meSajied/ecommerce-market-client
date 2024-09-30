import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FilterData } from "../components/FilterData";
import { ListData } from "../components/ListData";

function ListSubCategory() {
  const {id} = useParams();
  const {allSubCategory} = FilterData()

  const selectedSubCategory = allSubCategory.filter(subCat => subCat.id === parseInt(id));

  return (
    <ListData productList={selectedSubCategory} />
  )
}

export {ListSubCategory};