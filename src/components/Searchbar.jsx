import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Searchbar.module.css";
import { BsSearch } from "react-icons/bs";

export const Searchbar = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.goanny.link/api/product/getAll?limit=100")
        .then((response) => {
          // console.log(response.data.data); // Check the response
          setData(response.data.data);
        });
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    const filterProduct = data.filter((product) => {
      if (search === " ") {
        return product;
      } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
        return product;
      }
    });
    setFilterData(filterProduct);
  };

  return (
    <>
      <div className={style.container}>
        <span className={style.searchbar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button>{<BsSearch size={15} />}</button>
        </span>
        {filterData &&
          filterData.map((i) => {
            return (
              <div>
                <h6>{i.name}</h6>
              </div>
            );
          })}
      </div>
    </>
  );
};
