import React, { useEffect, useState } from "react";
import { Card } from "./Card";

function ListData({productList}) {
  return(
    <div className="flex flex-wrap space-x-3">
      {productList.map(ss => (
        <div>
          <Card product={ss} />
        </div>
      ))}
    </div>
  )
}

export {ListData}