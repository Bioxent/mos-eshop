import React from "react";

const Catalog = (props) => {
    return (
        <>
          <main>
            {props.productList}
          </main>
        </>
      );
};

export default Catalog;
