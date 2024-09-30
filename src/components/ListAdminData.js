import React, { useEffect, useState } from "react";
import { AdminCard } from "./AdminCard";

function ListAdminData({productList}) {
  return(
    <div className="flex flex-wrap space-x-3">
      {productList.map(ss => (
        <div>
          <AdminCard product={ss} />
        </div>
      ))}
    </div>
  )
}

export {ListAdminData}