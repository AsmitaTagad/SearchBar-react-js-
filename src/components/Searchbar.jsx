import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Searchbar.module.css";
import { BsSearch } from "react-icons/bs";

export const Searchbar = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.goanny.link/api/product/getAll?limit=100")
        .then((response) => {
          console.log(response.data.data); // Check the response
          setData(response.data.data);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={style.container}>
        <span className={style.searchbar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>{<BsSearch size={15} />}</button>
        </span>

        {data
          .filter((product) => {
            if (search === "") {
              return product;
            } else if (
              product.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          })
          .map((item) => {
            return (
              <div>
                <h4> {item.name}</h4>
              </div>
            );
          })}
      </div>
    </>
  );
};
